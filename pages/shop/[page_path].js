import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { firestoreDB } from '@/config/firebase.config';
import { collection,getDocs,query,where } from "firebase/firestore";
import { Button } from '@mui/material';

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
  const q = query(collection(firestoreDB,'products'),where('page_path','==',page_path))
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
        <title>{product.productName} | Irun</title>
      </Head>
      <section className='grid md:grid-cols-3 gap-8 py-10 px-8 sm:px-16'>
        <article>
            <Image
            width={520}
            height={460}
            src={product.coverImage} 
            alt={product.productName}/>
        </article>
        <aside className='min-h-[420px] col-span-2'>
            <h2 className='text-3xl text-gray-800'>{product.productName}</h2>
            <p className='text-xl text-gray-700 mt-8'>{product.desc}</p>
            <div className='w-full flex justify-between gap-8 md:gap-0 mt-8'>
                <p className='text-3xl text-gray-800'>₦{product.price}</p>
                <Button
                variant='contained'
                className='text-sky-700'
                onClick={() => {}}>Buy Now</Button>
            </div>
        </aside>
      </section>
    </>
  )
}
