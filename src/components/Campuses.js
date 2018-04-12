import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Campuses = ({ campuses }) => {
  if (!campuses.length) {
    return (
      <div>
        <p>No campus, Please add a campus</p>
        <button className='btn btn-primary btn-lg' id='submitBtn'><Link id='Link' to='/campuses/create'>Add Campus</Link></button>
      </div>
    );
  }
  return (
    <div className='container'>
      <h2 className='page-header'>All Campuses
       <button className='btn btn-primary btn-lg' id='submitBtn'><Link id='Link' to='/campuses/create'>Add Campus</Link></button>
      </h2>
      <div className='d-flex flex-row'>
        {
          campuses.map(campus => {
            return (
              <div className='panel panel-default' key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>
                  <div >
                    <img id='campusesImg' src={campus.imageUrl} />
                  </div>
                  <div>
                    <h4>{campus.name} Campus</h4>
                    <h5>{campus.description}</h5>
                  </div>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ campuses }) => {
  return {
    campuses
  };
};

export default connect(mapStateToProps)(Campuses);

