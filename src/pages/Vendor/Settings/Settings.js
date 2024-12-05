import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editSettings, getSettings } from '../../../store/vendor/settings/actions';
import CommonModal from '../../../components/Common/CommonModal';
import Spinners from '../../../components/Common/Spinner';

const Settings = (props) => {
  document.title = "Settings | Quench";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings, settingserror, settingssuccess, settingsloading } = useSelector((state) => state.SettingsData);
  const [isLoading, setLoading] = useState(settingsloading);
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1);

  const [localSettings, setLocalSettings] = useState({
    is_2fa_enabled: "0",
    is_email_message_enabled: "1",
    is_email_notification_enabled: "1",
  });

  useEffect(() => {
    if (!localStorage.getItem("vendoruser")) {
      navigate('/login')
    }
    else {
      dispatch(getSettings());
      setLoading(false);
    }
  }, [props.success]);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleToggle = (key) => {
    const updatedSettings = {
      ...localSettings,
      [key]: localSettings[key] === "1" ? "0" : "1",
    };
    setLocalSettings(updatedSettings);
  };

  const HandleSaveSettings = () => {
    dispatch(editSettings(localSettings));
    toggleModal1();
  };

  return (
    <Fragment>
      <div className="page-content" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className="heading">Settings</h1>
        {settingsloading ? (
          <Spinners setLoading={setLoading} />
        ) : (
          <div>
            <section style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h2 style={{ textAlign: 'center', fontSize: "20px" }}>Email Settings</h2>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{fontSize: "14px"}}>Email me when new announcements are published</span>
                  <button
                    onClick={() => handleToggle('is_email_notification_enabled')}
                    style={{
                      width: '50px',
                      height: '25px',
                      borderRadius: '50px',
                      border: '1px solid #ccc',
                      backgroundColor: localSettings.is_email_notification_enabled === "1" ? '#4caf50' : '#ccc',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: localSettings.is_email_notification_enabled === "1" ? 'calc(100% - 22px)' : '3px',
                        transition: 'left 0.3s ease',
                      }}
                    ></span>
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{fontSize: "14px"}}>Email me when I receive a new message</span>
                  <button
                    onClick={() => handleToggle('is_email_message_enabled')}
                    style={{
                      width: '50px',
                      height: '25px',
                      borderRadius: '50px',
                      border: '1px solid #ccc',
                      backgroundColor: localSettings.is_email_message_enabled === "1" ? '#4caf50' : '#ccc',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: localSettings.is_email_message_enabled === "1" ? 'calc(100% - 22px)' : '3px',
                        transition: 'left 0.3s ease',
                      }}
                    ></span>
                  </button>
                </div>
              </div>
            </section>
            <section style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h2 style={{ textAlign: 'center', fontSize: "20px" }}>Security Settings</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{fontSize: "14px"}}>2FA Authentication</span>
                <button
                  onClick={() => handleToggle('is_2fa_enabled')}
                  style={{
                    width: '50px',
                    height: '25px',
                    borderRadius: '50px',
                    border: '1px solid #ccc',
                    backgroundColor: localSettings.is_2fa_enabled === "1" ? '#4caf50' : '#ccc',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      left: localSettings.is_2fa_enabled === "1" ? 'calc(100% - 22px)' : '3px',
                      transition: 'left 0.3s ease',
                    }}
                  ></span>
                </button>
              </div>
            </section>
            <button type="button" className="btn btn-dark" onClick={() => HandleSaveSettings()}>Save Settings</button>
          </div>
        )}
      </div>
      {!isLoading &&
        <CommonModal
          isOpen={modal1}
          toggle={toggleModal1}
          title={settingssuccess ? "Updated" : "Alert"}
          message={settingssuccess ? "Settings updated successfully." : settingserror}
          redirectTo={settingssuccess ? "/settings" : toggleModal1}
          buttonText="Okay"
        />
      }
    </Fragment>
  );
};

export default Settings;