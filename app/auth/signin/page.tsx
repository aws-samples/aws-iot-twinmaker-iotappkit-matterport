'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useState } from "react"
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import * as Yup from "yup"

export default function Page () {

  const { signIn, isAuthenticated, isAuthenticating } = useAuth()

  const [mounted, setMounted] = useState(false)

  const router = useRouter()


  useEffect(() => {

    if(isAuthenticated){
      router.replace("/")
    }

    setMounted(true)

  }, [isAuthenticated, isAuthenticating])

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  })
  

  return (

    <>
   { !isAuthenticated && mounted? (
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image className="mx-auto h-10 w-auto"
            width={60}
            height={60}
            src="/3d.png"
            alt=""
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik 
            initialValues={{
              username: '',
              password: '',
              submit: null
            }} 
            validationSchema={validationSchema}
            onSubmit = { 
              async (values: any, { setErrors, setStatus, setSubmitting }: any ): Promise<void> => {

                try {
                  setSubmitting(true)
                  await signIn({username: values.username, password: values.password})
                  router.replace("/")
                  setSubmitting(false)
                } catch (e: any) {
                  setStatus({success: false})
                  setErrors({submit: e.message})
                  setSubmitting(false)
                }
        } }>

{({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }): JSX.Element => (
          
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

              <div>
              { errors.submit ? <div className='text-red-300 py-2'>{errors.submit}</div> : null} 
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={values?.username}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-100 shadow-sm  ring-gray-300 placeholder:text-gray-400  sm:leading-6"
                    />
                    {errors.username ? <div className='text-red-300'>{errors.username}</div> : null}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                    Password
                  </label>

                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values?.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-100 shadow-sm  ring-gray-300 placeholder:text-gray-400 sm:leading-6"/>
                    { errors.password && touched.password ? <div className='text-red-300 py-2'>{errors.password}</div> : null} 
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="flex mt-12 w-full justify-center rounded-md bg-[#958ABA] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ADA2D2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  Sign in
                </button>
              </div>
            </form>
          )}
          </Formik>
          </div>
   </div>
   ) : (<span></span>)
  }
  </>

  )
}

