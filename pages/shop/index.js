import React from 'react';
import Head from 'next/head';
import CourseCard from '../../components/CourseCard';
import { firestoreDB } from '@/config/firebase.config';
import { collection,getDocs,query } from "firebase/firestore";

export async function getStaticProps () {
    const data = [];

    const q = query(collection(db,'products'))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.map(doc => {
        let document = doc.data()
        document.uid = doc.id;
        data.push(document)
    })

    return {
        props:{
            courses:data
        }
    }
}

export default function Shop ({products}) {
    return (
        <>
        <Head>
            <link rel="alternate" href="#" hrefLang="en-us" />
            <link rel="icon" href="" />
            <title>Irun | Shop for Hair Products</title>
        </Head>
        <main className='py-20 px-8 sm:px-16'>
            <div className='grid md:grid-cols-4 gap-8'>
                {products.map(product => <p>hello</p>)}
            </div>
        </main>
        </>
    )
}
