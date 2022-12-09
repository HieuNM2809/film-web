import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer(props) {
     return (
          <footer>
               <div className="container">
                    <div className="noi-dung about">
                         <h2>Về Chúng Tôi</h2>
                         <p>DEV là một cộng đồng các nhà phát triển phần mềm cùng nhau giúp đỡ lẫn nhau. Ngành công nghiệp phần mềm dựa trên sự hợp tác và học tập trên mạng. Chúng tôi cung cấp một nơi để điều đó xảy ra.</p>
                         <ul className="social-icon">
                              <li><Link to=""><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></Link></li>
                              <li><Link to=""><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></Link></li>
                              <li><Link to=""><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></Link></li>
                              <li><Link to=""><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></Link></li>
                         </ul>
                    </div>
                    <div className="noi-dung links">
                         <h2>Đường Dẫn</h2>
                         <ul>
                              <li><Link to="#">Trang Chủ</Link></li>
                              <li><Link to="#">Về Chúng Tôi</Link></li>
                              <li><Link to="#">Thông Tin Liên Lạc</Link></li>
                              <li><Link to="#">Dịch Vụ</Link></li>
                              <li><Link to="#">Điều Kiện Chính Sách</Link></li>
                         </ul>
                    </div>
                    <div className="noi-dung contact">
                         <h2>Thông Tin Liên Hệ</h2>
                         <ul className="info">
                              <li>
                                   <span><FontAwesomeIcon icon={faMapMarker}></FontAwesomeIcon></span>
                                   <span>Đường Số 1<br />
                                        Quận 1, Thành Phố Hồ Chí Minh<br />
                                        Việt Nam</span>
                              </li>
                              <li>
                                   <span><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></span>
                                   <p><Link to="#">+84 123 456 789</Link></p>
                              </li>
                              <li>
                                   <span><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></span>
                                   <p><Link to="#">diachiemail@gmail.com</Link></p>
                              </li>
                         </ul>
                    </div>
               </div>
          </footer>
     );
}

export default Footer;