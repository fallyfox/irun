import Head from "next/head";
import { TextField,Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';

const formRules = yup.object().shape({
    productName:yup.string().required('This field is mandatory').min(3,'Minimum of 3 character required').max(10,'Maximum of 10 characters'),
    desc:yup.string().required('This field is mandatory').min(16,'Minimum of 16 character required').max(10000,'Maximum of 10,000 characters'),
    price:yup.number().required().min(100),
    stock:yup.number().required().min(1)
});

export default function CreateAccount() {

    const { values,handleChange,handleBlur,errors,touched,handleSubmit } = useFormik({
        initialValues:{productName:'',desc:'',price:0,stock:1},
        onSubmit: () => {
            console.log(values.productName);
        },
        validationSchema:formRules
    });

    return (
        <>
        <Head>
            <title>Irun Admin | Create a Product</title>
        </Head>
        <main className="h-screen flex justify-center bg-gray-300 py-4 md:py-8">
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