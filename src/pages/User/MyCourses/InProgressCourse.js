import React from 'react'

const InProgressCourse = () => {
  return (
    <div class="mx-3 mb-4 pb-4 border-bottom row">
      <div class="col-md-5 p-0">
        <img
          class="rounded-3 border border-dark"
          width="100%"
          src="https://picsum.photos/300/200"
          alt=""
        />
      </div>
      <div class="col-md-7 p-0 pt-3 pt-md-0 ps-md-3">
        <div class="course-name">
          <h5>HTML CSS Basic</h5>
        </div>
        <p class="">
          Learn HTML, CSS in this course and become a
          front-end developer
        </p>
      </div>
      <div class="mt-3 w-100 p-0">
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            aria-label="Default striped example"
            style={{ width: "60%" }}
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div
          class="m-0 pt-3 text-secondary fs-5 fw-semibold"
        >
          <span class="fst-italic">60% completed</span>
        </div>
      </div>
    </div>
  )
}

export default InProgressCourse