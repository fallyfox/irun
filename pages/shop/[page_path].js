import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { firestoreDB } from '@/config/firebase.config';
import { collection,getDocs,query,where,addDoc } from "firebase/firestore";
import { Button,Card,TextField,Modal } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { MdOutlineDoneAll } from "react-icons/md";

const formRules = yup.object().shape({
    address:yup.string().required('This field is mandatory').min(16,'Minimum of 16 character required').max(10000,'Maximum of 10,000 characters'),
    quantity:yup.number().required().min(1),
});

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
    const { data:session } = useSession();
    const [clickedOrder,setClickedOrder] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postOrder = async () => {
        await addDoc(collection(firestoreDB,'orders'),{
            customerName:session.user.name,
            customerUID:session.uid,
            productName:product.productName,
            productUID:product.uid,
            price:values.quantity * product.price,
            createdAt:new Date().getTime(),
        })
        .then(() => handleOpen())
        .catch((e) => console.error(e))
    }

    const { values,handleChange,handleBlur,errors,touched,handleSubmit } = useFormik({
        initialValues:{address:'',quantity:0},
        onSubmit: () => {
            postOrder();
        },
        validationSchema:formRules
    });

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
                <div className='w-full flex justify-between gap-8 md:gap-0 my-8'>
                    <p className='text-3xl text-gray-800'>₦{product.price}</p>
                    <Button
                    variant='contained'
                    className='text-sky-700'
                    onClick={() => clickedOrder ? setClickedOrder(false) : setClickedOrder(true)}>Buy Now</Button>
                </div>

                {/* place order block */}
                {clickedOrder ?
                <Card>
                    <div className='p-3'>
                        <p className='text-2xl text-center'>Complete Your Order</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="text-gray-500 text-sm">Delivery address</label>
                                <TextField
                                placeholder="your address"
                                className="w-full"
                                id="address"
                                multiline={true}
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.address && errors.address 
                                ? <span className="text-red-500 text-xs">{errors.address}</span> 
                                : null}
                            </div>

                            <div className="mb-2">
                                <label className="text-gray-500 text-sm">Quantity</label>
                                <TextField
                                placeholder="product price"
                                className="w-full"
                                id="quantity"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.quantity && errors.quantity 
                                ? <span className="text-red-500 text-xs">{errors.quantity}</span> 
                                : null}
                            </div>
                            <Button 
                            variant="contained" 
                            color="secondary" 
                            className="bg-red-700"
                            type="submit" 
                            >PLACE ORDER</Button>
                        </form>
                    </div>
                </Card>
                : null}
            </aside>
        </section>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div className='h-full flex justify-center items-center'>
                <blockquote className='bg-gray-200 w-full md:w-[320px] h-44 flex flex-col justify-center items-center py-4 px-3 rounded-md'>
                    <span><MdOutlineDoneAll className='text-8xl text-green-600'/></span>
                    <p className='text-xl text-green-800 text-center'>Your order was placed successfully</p>
                    <Button onClick={handleClose}>Close</Button>
                </blockquote>
            </div>
        </Modal>
        </>
    )
}
