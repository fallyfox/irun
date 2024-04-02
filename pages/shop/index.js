import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { firestoreDB } from '@/config/firebase.config';
import { collection,getDocs,query } from "firebase/firestore";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export async function getStaticProps () {
    const data = [];

    const q = query(collection(firestoreDB,'products'))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.map(doc => {
        let document = doc.data()
        document.uid = doc.id;
        data.push(document)
    })

    return {
        props:{
            products:data
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
                {products.map(product => (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        sx={{ height: 140 }}
                        image={product.coverImage}
                        title={product.productName}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.desc.length > 120 ? product.desc.substring(0,120) + "..." : product.desc}
                        </Typography>
                        </CardContent>
                        <CardActions>
                            <Link 
                            href={`shop/${product.page_path}`}
                            className='bg-red-700 py-2 px-3 text-white rounded-md'>View Product</Link>
                        </CardActions>
                   </Card>
                ))}
            </div>
        </main>
        </>
    )
}
