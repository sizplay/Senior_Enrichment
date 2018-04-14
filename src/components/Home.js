import React from 'react';

const Home = () => {
  return (
    <div className='container'>
      <div className='panel panel-default'>
        <div className='text-center'>
          <h2>Welcome to Senior Enrichment Project.</h2>
          <h5>this project has Students and Campuses</h5>
          <p>
          I have some issues. <br /> 1. Please refresh /students page after deleting a Campus. <br />
          2. Please click text in some buttons instead of edge of the buttons.<br />
          3. When you validate student GPA, it is only validated for empty. <br /> it should be validated for not number and min 0 to max 4. <br /> Please use seed file when you need data.<br /><br />
            https://www.youtube.com/watch?v=3FtRxT2S5R0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
