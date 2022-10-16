import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import ToastNoti from '../../../components/ToastNoti';
import VerticalNav from '../VerticalNav';
import ListCourse from './ListCourse';
import PaginationCourse from './PaginationCourse';

const MyCourse = () => {

  const param = useParams();

  useEffect(() => {

  }, [param.page]);

  return (
    <>
      <Navbar />
      <div className="mt-6 container-fluid vh-75 row">
        <div className="col-2">
          <VerticalNav activeLink="/expert/course" />
        </div>

        <div className="col-10 border-start">
          <ListCourse page={param.page} />
          {/* <div className="d-flex justify-content-center">
            <PaginationCourse page={param.page} />
          </div> */}
        </div>

        <ToastNoti />
      </div >

      <Footer />
    </>
  )
}

export default MyCourse