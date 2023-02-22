import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import AuthContextProvider from '../../context/AuthContext'
import { useAuth } from "../../hooks/useAuth";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./User.scss";

export default function UpdateUser() {
  const { user, setUser, isAdmin } = useContext(AuthContextProvider);
  const { updateUser } = useAuth();

  // Save Data Form
    const [form, setForm] = useState({});

  // Control Edit inputs fields
    const [check, setCheck] = useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
      chat_id: "",
    });

  //Temporary fields to set the name and avatar
    const [change, setchange] = useState({
      temp_avatar: "",
      temp_name: ""
    });

    const change_img = () => {
      setCheck({...check, avatar: '' });
      setchange({...change, temp_avatar : form.avatar });
    };

    const SetName_LastName = () => {
      setCheck({...check, name: '' });
      const fullNameSplit= change.temp_name.split(' ');
      if (fullNameSplit.length > 1){
        setForm({...form, first_name : fullNameSplit[0], last_name: fullNameSplit.slice(1).join(" ")})
      }
      else{
        setForm({...form, first_name : fullNameSplit[0], last_name: ""})
      }
    };

  
  // Telegram Feature
    const generateChatId = () => {
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const ClickTelegram = () => {
      const newChatId = generateChatId();
      setForm({...form, chatID: newChatId });
      setCheck({...check, chat_id: true });
    };

    const saveChatId = async () => {
      setCheck({...check, chat_id: '' });
      await navigator.clipboard.writeText(form.chatID);
      updateUser(form);
      window.open("https://web.telegram.org/z/#5944160111", "_blank");
    };
  
  // Control Regex errors
    const [err, setErr] = useState({
      email: "",
      passwd: ""
    });

    const chechErrors = () => { 
      
      const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const regex_passwd = /^[A-Z0-9._@%&+-]{4,}/i;
      if (form.email) {
        if (!regex_email.test(form.email)) {
          if(form.password) {
            if (form.password.length==0) {
              setErr({ email: '*Wrong email format ', passwd: ''});
            }
          }
        }else {
          if (!form.password) {
            setErr({ email: '', passwd: ''});
          }
        }
      }

      if (!regex_passwd.test(form.password) && form.password.length!=0) {
      }else {
        setErr({ ...err, passwd: ''});
        if(form.email){
          if (!regex_email.test(form.email)) {
            setErr({ email: '*Wrong email format ', passwd: ''});
          }else {
            setErr({ email: '', passwd: ''});
          }
        }
      }

      if (form.email === '' && form.password === '') {
        setErr({ email: '', passwd: ''});
      }
    };

    useEffect(() => {
        chechErrors()
    }, [form.email, form.password])


  // Update fields profile
    const Update_fields = () => {
      setCheck({...check,name:'',email:'',password:'',avatar:''});
      updateUser(form);
    }


  return (
    <>
      <div>
        <div className="d-flex justify-center align-baseline">
          <img src={change.temp_avatar ? change.temp_avatar : user.avatar} alt="avatar" className="img_profile text-center rounded-circle img-fluid"></img>
        </div>
        <form className='form-outline mb-4'>
          {/* Username */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-user" /></p>
              {!check.name && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{change.temp_name ? change.temp_name : (user.first_name + ' ' + user.last_name)}</h5>
              )}
              {check.name  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="text" value={form.name} onChange={(e) => setchange({...change, temp_name: e.target.value})} placeholder={change.temp_name ? change.temp_name : (user.first_name + ' ' + user.last_name)} id="name"/>
                </div>
              )}
              {!check.name && (
                <p onClick={() => setCheck({ ...check, name: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.name && (
                <p onClick={SetName_LastName} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
          </div>
          <hr className='w-[100%]'/>
          {/* Email */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-envelope" /></p>
              {!check.email && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{form.email ? (form.email.length < 20 ? form.email : form.email.substring(0, 17) + "...") : (user.email.length < 20 ? user.email : user.email.substring(0, 16) + "...")}</h5>
              )}
              {check.email  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" autoComplete='off' type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={form.email ? form.email : user.email} id="email"/>
                </div>
              )}
              {!check.email && (
                <p onClick={() => setCheck({ ...check, email: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.email && (
                <p onClick={() => {setCheck({...check, email: '' }); {chechErrors()}}} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
            {err.email && (
              <span className='text-red-500'>{err.email}</span>
            )}
          </div>
          <hr className='w-[100%]'/>
          {/* Password */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-key" /></p>
              {!check.password && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">*******</h5>
              )}
              {check.password  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" autoComplete='off' type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder='*******' id="password"/>
                </div>
              )}
              {!check.password && (
                <p onClick={() => setCheck({ ...check, password: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.password && (
                <p onClick={() => {setCheck({...check, password: '' })} }className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
            {err.passwd && (
            <span className='text-red-500'>{err.passwd}</span>
            )}
          </div>
          <hr className='w-[100%]'/>
          {/* Avatar */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <div className="p_avatar">
                 <img  src={change.temp_avatar ? change.temp_avatar :user.avatar} alt="avatar" className="avatar"/>  
              </div>
              {!check.avatar && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{`${user.first_name.toLowerCase()}_avatar.png`}</h5>
              )}
              {check.avatar  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="text" value={form.avatar} onChange={(e) => setForm({...form, avatar: e.target.value})} placeholder={`${user.first_name.toLowerCase()}_avatar.png`} id="avatar"/>
                </div>
              )}
              {!check.avatar && (
                <p onClick={() => setCheck({ ...check, avatar: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.avatar && (
                <p onClick={change_img} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
              
            </div>
          </div>
          <hr className='w-[100%]'/>
          {/* Telegram and Buton Incidents and Rent*/}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              {check.chat_id  && (
              <div className="p_avatar" onClick={() => {setCheck({...check, chat_id: '' })} }c>
                <img  src="https://i.postimg.cc/L5J3J8kf/telegram.png" alt="Icon Telegram" className="avatar"/>  
              </div>
              )}

              {check.chat_id  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" readOnly type="text" value={form. chatID} placeholder={`${user.first_name.toLowerCase()}_avatar.png`} id="avatar"/>
                </div>
              )}
              {check.chat_id && (
                <p onClick={saveChatId} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}

            {!check.chat_id && (
              <>
              <div className='d-flex justify-center'>
                <div className="p_avatar btn_profile bg-white" onClick={ClickTelegram}>
                  <img  src="https://i.postimg.cc/L5J3J8kf/telegram.png" alt="Icon Telegram" className="avatar"/>  
                </div>
                <div className="p_avatar btn_profile ml-9" onClick={() => {setUser({...user, opt_profile : true })} }c>
                  <img  src="https://i.postimg.cc/SKpnJLj4/image-1.png" alt="Icon incidences" className="avatar"/>  
                </div>
                {isAdmin && (
                  <div className="p_avatar btn_profile ml-9" onClick={() => {setUser({...user, opt_profile : false })} }c>
                    <img  src="https://i.postimg.cc/cLF8W2MP/list-incidents-people.png" alt="Icon List Rent" className="avatar"/>  
                  </div>
                )}
                {!isAdmin && (
                  <div className="p_avatar btn_profile ml-9" onClick={() => {setUser({...user, opt_profile : false })} }c>
                    <img  src="https://i.postimg.cc/Pf159vqv/image.png" alt="Icon List Rent" className="avatar"/>  
                  </div>
                )}
              </div>
               
              </>
            )}
            </div>
          </div>

          {/* Buttons From */}
          {(err.email || err.passwd) && (
            <>
              <hr className='w-[100%]'/>
              <button type="button" className="px-8 py-3 text-white bg-black border-2 border-red-700 rounded focus:outline-none disabled:opacity-75"disabled>Save Profile</button>
            </>
          )}
          
          {((form.first_name || form.last_name || form.email || form.password || form.avatar) && !err.email && !err.passwd ) && (
            <>
              <hr className='w-[100%]'/>
              <a className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md no-underline">
              <span className="w-full h-full bg-gradient-to-br from-[#5ef1a9] via-[#5ef0f1] to-[#5ea6f1] group-hover:from-[#070707] group-hover:via-[#000000] group-hover:to-[#000000] absolute"></span>
                <span onClick={Update_fields} className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400 border-2 border-transparent hover:border-green-500">
                <span className="relative text-white hover:text-black">Save Profile</span>
                </span>
              </a>
            </>
           )}
        </form>
      </div>
    </>
  );
}


