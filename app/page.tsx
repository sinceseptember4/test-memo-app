'use client'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

console.log("Firebase Config:", firebaseConfig); // これで値が正しく読み込まれているか確認できるよ
// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [text, setText] = useState("");

  const handleSave = async () => {
    if (!text) return alert("なんか書いて！");
    try {
      // 'memos' という名前のコレクション（フォルダみたいなもの）に保存
      await addDoc(collection(db, "memos"), {
        content: text,
        timestamp: new Date()
      });
      alert("Firestoreに保存成功！");
      setText(""); // 入力欄を空にする
    } catch (e) {
      console.error("エラーだよ:", e);
      alert("保存に失敗したわ。");
    }
  };

  return (
    <main style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>ショボいメモアプリ</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに入力..."
        style={{ padding: "10px", color: "black", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button 
        onClick={handleSave}
        style={{ marginLeft: "10px", padding: "10px 20px", cursor: "pointer", background: "blue", color: "white", borderRadius: "5px" }}
      >
        保存！
      </button>
    </main>
  );
}