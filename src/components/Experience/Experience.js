import React, { useState, useEffect } from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { Container, Typography } from "@material-ui/core";
import "./styles.css";

function Experience() {
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const response = await fetch("data.json");
    const newJob = await response.json();
    setJobs(newJob);
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  if (loading) {
    return (
      <section>
        <h3>loading..</h3>
      </section>
    );
  }
  // destructure from first job
  const { company, date, title, duties } = jobs[value];
  return (
    <Container>
      <Typography variant="h4" component="h6" className="title">
        Experience
      </Typography>
      <div className="underline"></div>
      <div className="container">
        {/* iterate over the jobs and dispaly button for every job */}
        <div className="btn-section">
          {jobs.map((item, index) => {
            return (
              <button
                className={`btn ${index === value && "active"}`}
                key={item.id}
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <div className="exp-section">
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5">{company}</Typography>
          <Typography variant="body2" component="p">
            {date}
          </Typography>
          {duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <DoubleArrowIcon className="job-icon" />
                <Typography variant="body2" component="p">
                  {duty}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Experience;
