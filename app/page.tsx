'use client';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  linkWithPopup,
  User,
} from 'firebase/auth';
import { useState, useEffect } from 'react';

interface Memo {
  id: string;
  content: string;
  userId: string;
  timestamp: Timestamp;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

console.log('Firebase Config:', firebaseConfig); // これで値が正しく読み込まれているか確認できるよ
// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default function Home() {
  const [text, setText] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [memos, setMemos] = useState<Memo[]>([]);
  // 1. ログイン状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth);
      } else {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 自分が書いたメモだけをリアルタイムで取得する
  useEffect(() => {
    if (!currentUser) return;

    // 「userId が自分と同じ」かつ「作成順」に並べるクエリ
    const q = query(
      collection(db, 'memos'),
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'desc'),
    );

    // リアルタイムリスナー（DBが変わると勝手に画面も変わる神機能）
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const memoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Memo[];
      setMemos(memoData);
    });

    return () => unsubscribe();
  }, [currentUser]);
  const handleSave = async () => {
    if (!text) return alert('なんか書いて！');
    if (!currentUser) return alert('ユーザーがいないよ');

    try {
      await addDoc(collection(db, 'memos'), {
        content: text,
        userId: currentUser.uid, // 👈 これ重要
        timestamp: new Date(),
      });
      setText('');
      alert('保存成功！');
    } catch (e) {
      console.error(e);
    }
  };
  // 昇格機能：今の匿名垢を Google垢にリンクする
  const upgradeAccount = async () => {
    if (!currentUser) return;
    try {
      const result = await linkWithPopup(currentUser, googleProvider);
      setCurrentUser(result.user);
      alert('昇格成功！');
    } catch (error) {
      console.error(error);
      alert('失敗。既に別のGoogle垢でログインしたことあるかも？');
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('これ消しちゃっていいの？')) return;
    try {
      // db, コレクション名, ドキュメントID を指定して爆破
      await deleteDoc(doc(db, 'memos', id));
      // onSnapshot が勝手に検知して画面からも消えるよ
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
      <h1>超・進化したメモアプリ</h1>

      {/* 入力エリア */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ color: 'black', padding: '10px' }}
      />
      <button
        onClick={handleSave}
        style={{ padding: '10px', background: 'blue' }}
      >
        保存
      </button>

      {/* 昇格ボタン（匿名時のみ表示） */}
      {currentUser?.isAnonymous && (
        <button
          onClick={upgradeAccount}
          style={{
            display: 'block',
            margin: '20px auto',
            background: 'orange',
          }}
        >
          Google連携してデータを守る
        </button>
      )}

      {/* メモ一覧表示 */}
      <ul style={{ marginTop: '30px', listStyle: 'none' }}>
        {memos.map((memo) => (
          <li
            key={memo.id}
            style={{ borderBottom: '1px solid #444', padding: '10px' ,color: 'black',}}
          >
            {memo.content}
          </li>
        ))}
      </ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #333',
          }}
        >
          <span
          style={{
            color: 'black',
          }}
          >{memo.content}</span>
          <button
            onClick={() => handleDelete(memo.id)}
            style={{
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            消す
          </button>
        </li>
      ))}
    </main>
  );
}
