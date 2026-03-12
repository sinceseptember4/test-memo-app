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
import Header from "@/components/layout/Header";

export default function Home() {

  return (
    <main style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
      <Header />
      <h1 className="text-4xl font-bold mt-10">Welcome to LOGOS</h1>
      <p className="mt-4 text-lg">Your personal study assistant for university life.</p>
    </main>
  );
}
