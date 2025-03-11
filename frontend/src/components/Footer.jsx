const Footer=()=>{
    return(
        <footer className="bg-red-700 text-white py-6 mt-20">
      <div className="container mx-auto px-4">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-700 pb-6">
          
          {/* Part 1: Contact Queries */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">For any queries</h3>
            <p className="text-sm text-white-400">devisri.padala@sasi.ac.in</p>
            <p className="text-sm text-white-400">livingstunn.dasi@sasi.ac.in</p>
          </div>

          {/* Part 2: Social Media Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Follow Us On</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-white-400 hover:text-blue-400"><i className="fab fa-linkedin fa-lg"></i></a>
              <a href="#" className="text-white-400 hover:text-pink-500"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-white-400 hover:text-blue-500"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#" className="text-white-400 hover:text-red-500"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>

          {/* Part 3: College Name & Mail */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Sasi Institute of Technology & Engineering</h3>
            <p className="text-sm text-white-400">info@sasi.ac.in</p>
          </div>

        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Companies Visited Our College</h3>
          <div className="flex space-x-6">
            <img src="amazon.webp" alt="Amazon" className="h-12" />
            <img src="wipro.svg" alt="Wipro" className="h-12" />
            
            <span className= "text-white-400 text-sm">and many more...</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex justify-center items-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm text-white-400">
            © 2025 Sasi Institute of Technology & Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    )
}

export default Footer;