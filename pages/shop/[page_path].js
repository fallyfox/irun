import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { firestoreDB } from '@/config/firebase.config';
import { collection,getDocs,query,where } from "firebase/firestore";

export async function getStaticPaths () {
  const querySnapshot = await getDocs(collection(firestoreDB,'products'))

  const paths = querySnapshot.docs.map(doc => {
    return {
      params:{
        page_path:doc.data().page_path
      }
    }
  })

  return {
    paths,
    fallback:false
  }  
}

export const getStaticProps = async (context) => {
  const page_path = context.params.page_path

  const products = []
  const q = query(collection(db,'products'),where('page_path','==',page_path))
  const querySnapShot = await getDocs(q)
  querySnapShot.docs.map(doc => {
    let document = doc.data();
    document.uid = doc.id;
    products.push(document)
})

  return {
    props:{product:products[0]}
  }
}

export default function ProductView({product}) {

  return (
    <>
      <Head>
        <link rel="alternate" href="#" hrefLang="en-us" />
        <link rel="icon" href="" />
        <title>{course.course_title} | early code</title>
      </Head>
      <main className='grid md:grid-cols-3 gap-8 py-10 px-8 sm:px-16'>
        {product.title}
      </main>
    </>
  )
}
