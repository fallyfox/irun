import React,{ useEffect,useState } from 'react';
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";//////////
import { TextField,Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'; 
import { firestoreDB,storage } from "@/config/firebase.config";
import { collection,addDoc,doc,updateDoc } from 'firebase/firestore';
import { ref,uploadString,getDownloadURL } from 'firebase/storage';

const formRules = yup.object().shape({
    productName:yup.string().required('This field is mandatory').min(3,'Minimum of 3 character required').max(1000,'Maximum of 10 characters'),
    desc:yup.string().required('This field is mandatory').min(16,'Minimum of 16 character required').max(10000,'Maximum of 10,000 characters'),
    price:yup.number().required().min(100),
    stock:yup.number().required().min(1),
    page_path:yup.string().required().min(3),
});

export default function CreateAccount() {
    const {data:session} = useSession();
    const [selectedFile,setSelectedFile] = useState(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const createProduct = async () => {
        const docRef = await addDoc(collection(firestoreDB,'products'),{
            productName:values.productName,
            desc:values.desc,
            page_path:values.page_path,
            price:values.price,
            stock:values.stock,
            createdAt:new Date().getTime(),
            createdBy: session.uid,
        });

        const imageRef = ref(storage,`products/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef,selectedFile,"data_url")
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(firestoreDB,'products',docRef.id),{
                    coverImage:downloadURL
                });
            });
        } else {
        
        }
    }

    const { values,handleChange,handleBlur,errors,touched,handleSubmit } = useFormik({
        initialValues:{productName:'',desc:'',price:0,stock:1,page_path:''},
        onSubmit: () => {
            createProduct();
        },
        validationSchema:formRules
    });
    
    return (
        <>
        <Head>
            <title>Irun Admin | Create a Product</title>
        </Head>
        <main className="min-h-screen flex justify-center bg-gray-300 py-4 md:py-8">
            <div className="w-full md:w-[400px] px-2 md:px-4 py-2 md:py-4 bg-gray-200 rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="text-gray-500 text-sm">Product name</label>
                        <TextField
                        placeholder="product name"
                        className="w-full"
                        id="productName"
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                       {touched.productName && errors.productName 
                       ? <span className="text-red-500 text-xs">{errors.productName}</span> 
                       : null}
                    </div>

                    <div className="mb-2">
                        <label className="text-gray-500 text-sm">Product description</label>
                        <TextField
                        placeholder="product description"
                        className="w-full"
                        id="desc"
                        multiline={true}
                        value={values.desc}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                       {touched.desc && errors.desc 
                       ? <span className="text-red-500 text-xs">{errors.desc}</span> 
                       : null}
                    </div>
                    <div className="mb-2">
                        <label className="text-gray-500 text-sm">Product URL</label>
                        <TextField
                        placeholder="eg. samsung-galaxy"
                        className="w-full"
                        id="page_path"
                        multiline={true}
                        value={values.page_path}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                       {touched.page_path && errors.page_path 
                       ? <span className="text-red-500 text-xs">{errors.page_path}</span> 
                       : null}
                    </div>

                    <div className="mb-2">
                        <label className="text-gray-500 text-sm">Product price</label>
                        <TextField
                        placeholder="product price"
                        className="w-full"
                        id="price"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                       {touched.price && errors.price 
                       ? <span className="text-red-500 text-xs">{errors.price}</span> 
                       : null}
                    </div>

                    <div className="mb-2">
                        <label className="text-gray-500 text-sm">How many do you have in stock?</label>
                        <TextField
                        placeholder="eg. 200"
                        className="w-full"
                        id="stock"
                        type="number"
                        value={values.stock}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                       {touched.stock && errors.stock 
                       ? <span className="text-red-500 text-xs">{errors.stock}</span> 
                       : null}
                    </div>

                    <div className="mb-2">
                        <input 
                        className=""
                        type="file"
                        accept="image/*"
                        id="filePicker"
                        onChange={addImageToPost}
                        />
                    </div>

                    <Button 
                    variant="contained" 
                    color="secondary" 
                    className="bg-purple-700"
                    type="submit" 
                    >CREATE PRODUCT</Button>
                </form>
            </div>
        </main>
        </>
    )
}

export async function getServerSideProps (context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    
    if (session) {
        // if (session.user_data?.accountType == 'admin') {
        //     return {redirect:{destination:'/admin/create-product',permanent:false}}
        // } 
        // else if (session.user_data?.accountType == 'buyer') {
        //     return {redirect:{destination:'/',permanent:false}}
        // } 
    } else {
        return {redirect:{destination:'/auth/signin',permanent:false}}
    }
    
    return {
        props:{
            session:JSON.parse(JSON.stringify(session))
        }
    }
}