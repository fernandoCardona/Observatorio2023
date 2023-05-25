//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { BtnMenu } from "../components/miniComponents";
import { AdminMenu, Logout } from '../components/AdminLayout';
//IMPORTS Styles/Images DE LA APP:
import { image } from "../assets";
//import { Icon } from '../../assets';
import './AdminLayout.scss';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

gsap.registerPlugin(CSSPlugin);

export const AdminLayout = (props) => {
    const { children } = props;

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
   

    useEffect(() => {
      if (isOpen) {
        gsap.to('.logo-resp', {
          duration: 0.5,
          opacity: 0,
          ease: 'power4.out',
        });
        gsap.to('.admin-layout__left', {
          duration: 0.5,
          left: '0px',
          ease: 'power4.out',
        });
      } else {
        gsap.to('.logo-resp', {
          duration: 0.5,
          opacity: 1,
          ease: 'power4.out',
        });
        gsap.to('.admin-layout__left', {
          duration: 0.5,
          left: '-300px',
          ease: 'power4.out',
        });
      }
    }, [isOpen]);
    const handleClick = () => {
      console.log('HAS HECHO CLICK!!!')
      setIsOpen(!isOpen)
    }
    return (
      <div className="admin-layout">
          <div className="admin-layout__left" ref={menuRef}>
            <Image src={image.bestinverWhite} className='logo' onClick={handleClick}/>
            <AdminMenu onClick={handleClick}/>
          </div>
          <div className="admin-layout__right">
            <div className="admin-layout__right-header">
              <BtnMenu onClick={handleClick} />
              <Image src={image.bestinverWhite} className='logo-resp'/>
              <Logout/>
            </div>
            <div className="admin-layout__right-content">
              { children }
            </div>
          </div>
      </div>
    )
}
