import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../config/api';
import withLogin from '../../HOC/withLogin';
import {rootUrl1} from '../../config/api';
import './Home.style.scss';

const statuses = {
  NotStarted: 'success',
  Started: 'info',
  Submitted: 'primary',
  Finished: 'secondary'
  
};

const Event = (props) => {
  const { i, name, id, is_active, event_ended, is_prelims_submitted } = props;
  let status = 'NotStarted';
  if (is_active) {
    status = 'Started';
  }
  if (event_ended) {
    status = 'Finished';
  }
  if(is_prelims_submitted){
    status = 'Submitted';
  }

  const clickHand = () => {
    fetch(`${rootUrl1}/api/events/${id}`)
    .then(res => res.json())
    .then(data => {
      if(window.localStorage.getItem(id) === null){
        window.localStorage.setItem(id, JSON.stringify({
          min : data.duration.split(":")[1],
          sec : 1
        }));
      }
      });
    
    if(!(is_active === true && event_ended === false && is_prelims_submitted === false)){
      alert("sorry");
    }
  }
  return (
    <Link onClick={clickHand} to={(is_active === true && event_ended === false && is_prelims_submitted === false) ? `/prelims/${id}` : '/'}>
      <div className="sub">
        <div className="dashHead d1">
          <h5>{i + 1}</h5>
        </div>
        <div className="dashHead d2">
          <h5>{name}</h5>
        </div>
        <div className="dashHead d3">
          <span className={`btn btn-sm btn-${statuses[status]} hbt`}>
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents().then(res => {
      setEvents(res.results)});
  }, []);
  return (
    <div className="home">
      <div>
        <div className="home-title">
          <h1>Dashboard</h1>
        </div>
        <div>
          <div className="main">
            <div className="dashHead dh1">
              <h4>#</h4>
            </div>
            <div className="dashHead dh2">
              <h4>Event</h4>
            </div>
            <div className="dashHead dh3">
              <h4>Status</h4>
            </div>
          </div>
          <div className="dashList">
            {events.map((e, i) => (
              <Event {...e.event} key={i} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLogin(Home);
