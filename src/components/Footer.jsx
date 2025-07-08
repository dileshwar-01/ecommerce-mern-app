import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-6 mt-20 text-sm '>
        <div>
            <img src={assets.urbanAura} className='mb-5 w-28' alt="" />
            <p className='w-full md:2/3 text-gray-600'>
            UrbanAura lets you find and order the latest street wears with great quality in affordable prices. Product ranges from vintage classic to modern wears with the latest trends. Stay connected with UrbanAura and get you favourite fits for every season, every occassion and every day. 
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-987-934-8762</li>
                <li>urbanAura@contact.in</li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ urbanAura.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
