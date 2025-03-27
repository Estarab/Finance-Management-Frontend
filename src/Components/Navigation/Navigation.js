import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <NavStyled>
            <div className="nav-container">
                {/* User section with logo */}
                {/* <div className="user-con"> */}
                    {/* <img src={avatar} alt="avatar" /> */}
                    {/* <div className="text">
                        <h2>CKK's HuB</h2>
                        <p>Financial Statement</p>
                    </div> */}
                {/* </div> */}

                {/* Menu toggle button for mobile */}
                {/* <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span />
                    <span />
                    <span />
                </div> */}

                {/* Menu items */}
                {/* <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul> */}

                {/* Sign out button */}
                {/* <div className="bottom-nav">
                    <li>{signout} Sign Out</li>
                </div> */}
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 1rem 2rem;
    width: 100%;
    height: 80px;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .user-con {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 200px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            
            
            padding: 0.2rem;
            
        }

        h2 {
            color: rgba(34, 34, 96, 1);
            margin: 0;
        }

        p {
            color: rgba(34, 34, 96, 0.6);
            margin: 0;
        }
    }

    .menu-items {
        display: flex;
        gap: 1.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-grow: 1;
        justify-content: center;

        li {
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            font-weight: 500;
            color: rgba(34, 34, 96, 0.6);

            i {
                margin-right: 0.5rem;
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.1rem;
            }

            &.active {
                color: rgba(34, 34, 96, 1) !important;

                i {
                    color: rgba(34, 34, 96, 1) !important;
                }

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 4px;
                    height: 100%;
                    background: #222260;
                    border-radius: 0 10px 10px 0;
                }
            }
        }
    }

    .bottom-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;

        li {
            cursor: pointer;
            color: rgba(34, 34, 96, 0.6);
            font-weight: 500;
        }
    }

    /* Mobile and tablet styles */
    @media (max-width: 768px) {
        .menu-items {
            display: none; /* Hide the menu items by default */
            flex-direction: column;
            width: 100%;
            margin-top: 1rem;
        }

        .menu-items.open {
            display: flex; /* Show the menu when it's open */
        }

        .menu-toggle {
            display: block;
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;

            span {
                display: block;
                width: 25px;
                height: 3px;
                background: #222260;
                margin: 5px 0;
                transition: 0.3s;
            }

            &.open span:nth-child(1) {
                transform: rotate(-45deg);
                position: relative;
                top: 8px;
            }

            &.open span:nth-child(2) {
                opacity: 0;
            }

            &.open span:nth-child(3) {
                transform: rotate(45deg);
                position: relative;
                top: -8px;
            }
        }

        .bottom-nav {
            display: none; /* Hide the sign-out button on mobile */
        }
    }

    /* Desktop and larger screen styles */
    @media (min-width: 769px) {
        .menu-toggle {
            display: none; /* Hide the hamburger menu on larger screens */
        }

        .bottom-nav {
            display: block; /* Show the sign-out button on larger screens */
        }
    }
`;

export default Navigation;





// import React, { useState } from 'react'
// import styled from 'styled-components'
// import avatar from '../../img/avatar.png'
// import { signout } from '../../utils/Icons'
// import { menuItems } from '../../utils/menuItems'

// function Navigation({active, setActive}) {
    
//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={avatar} alt="" />
//                 <div className="text">
//                     <h2>CKK's HuB</h2>
//                     <p>Financial Statement</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => {
//                     return <li
//                         key={item.id}
//                         onClick={() => setActive(item.id)}
//                         className={active === item.id ? 'active': ''}
//                     >
//                         {item.icon}
//                         <span>{item.title}</span>
//                     </li>
//                 })}
//             </ul>
//             <div className="bottom-nav">
//                 <li>
//                     {signout} Sign Out
//                 </li>
//             </div>
//         </NavStyled>
//     )
// }

// const NavStyled = styled.nav`
//     padding: 2rem 1.5rem;
//     width: 374px;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;
//     .user-con{
//         height: 100px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         img{
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }
//         h2{
//             color: rgba(34, 34, 96, 1);
//         }
//         p{
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items{
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         li{
//             display: grid;
//             grid-template-columns: 40px auto;
//             align-items: center;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;
//             i{
//                 color: rgba(34, 34, 96, 0.6);
//                 font-size: 1.4rem;
//                 transition: all .4s ease-in-out;
//             }
//         }
//     }

//     .active{
//         color: rgba(34, 34, 96, 1) !important;
//         i{
//             color: rgba(34, 34, 96, 1) !important;
//         }
//         &::before{
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
//     }
// `;

// export default Navigation