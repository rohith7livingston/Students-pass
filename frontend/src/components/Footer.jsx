const Footer=()=>{
    return(
        <footer className="bg-red-700 text-white py-6 ">
      <div className="container mx-auto px-4">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6  pb-4">
          
          {/* Part 1: Contact Queries */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="text-sm text-white-400 mt-4">devisri.padala@sasi.ac.in</p>
            <p className="text-sm text-white-400">livingstunn.dasi@sasi.ac.in</p>
          </div>

          {/* Part 2: Social Media Links */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Follow Us On</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.linkedin.com/school/sasi-institute-of-technology-&-engineering/" className="text-white-400 hover:text-blue-400"><i className="fab fa-linkedin fa-lg"></i></a>
              <a href="https://www.instagram.com/sasiengineeringcollege/" className="text-white-400 hover:text-pink-500"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="https://www.facebook.com/sasi.ac.in" className="text-white-400 hover:text-blue-500"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="https://www.youtube.com/channel/UCNkjan_uvAsiSVGR2wKPS6w" className="text-white-400 hover:text-red-500"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>

          {/* Part 3: College Name & Mail */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Sasi Institute of Technology & Engineering</h3>
            <p className="text-sm text-white-400 mt-4">sasi.mailservice@gmail.com
            </p>
          </div>

        </div>

        
        {/* Section 3 */}
        <div className="flex justify-center items-center mt-6   ">
          <p className="text-lg text-white-400">
          © 2025 SASI Institute of Technology & Engineering All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
    )
}

export default Footer;