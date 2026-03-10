import { auth, googleProvider } from "../lib/firebase"; // パスは自分の環境に合わせて
import { signInWithPopup, signOut } from "firebase/auth";

export default function LoginPage() {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("ユーザー情報:", result.user);
      alert(`${result.user.displayName}さん、いらっしゃいませー！`);
    } catch (error) {
      console.error("ログイン失敗...", error);
    }
  };

  const logout = () => signOut(auth);

  return (
    <div className="p-10">
      <button 
        onClick={login}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Googleでログイン
      </button>
      <button onClick={logout} className="ml-4">ログアウト</button>
    </div>
  );
}