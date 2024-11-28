import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Container } from "reactstrap";
//Import Breadcrumb
import "flatpickr/dist/themes/material_blue.css";

//i18n
import { withTranslation } from "react-i18next";

const Dashboard = props => {

    //meta title
    document.title = "Dashboard | Quench";
   
    const [username, setusername] = useState("Admin");
  
    useEffect(() => {
        if (localStorage.getItem("vendoruser")) {
            const obj = JSON.parse(localStorage.getItem("vendoruser"));

            setusername(obj.username);

        }
    }, [props.success]);

 

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>



                    <div className="alert-success alert alert-success fade show">
                        <h4 className="alert-heading">Welcome to Quench {username}</h4>
                      
                    </div>
                </Container>
            </div>
           
        </React.Fragment>
    );
};

Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
