import React from "react";
import footer from '../../assets/images/footer.png'

const Footer = () => {
  return (
    <section style={{background: `url(${footer})`, backgroundSize: 'contain'}}>
      <footer class="footer p-10 text-base-content pt-12 container mx-auto">
        <div>
          <span class="footer-title">Services</span>
          <a href="#!" class="link link-hover">Branding</a>
          <a href="#!" class="link link-hover">Design</a>
          <a href="#!" class="link link-hover">Marketing</a>
          <a href="#!" class="link link-hover">Advertisement</a>
        </div>
        <div>
          <span class="footer-title">Company</span>
          <a href="#!" class="link link-hover">About us</a>
          <a href="#!" class="link link-hover">Contact</a>
          <a href="#!" class="link link-hover">Jobs</a>
          <a href="#!" class="link link-hover">Press kit</a>
        </div>
        <div>
          <span class="footer-title">Legal</span>
          <a href="#!" class="link link-hover">Terms of use</a>
          <a href="#!" class="link link-hover">Privacy policy</a>
          <a href="#!" class="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer class="footer px-10 py-4 border-t text-base-content border-base-300">
        <div class="footer footer-center p-4 text-base-content">
          <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
