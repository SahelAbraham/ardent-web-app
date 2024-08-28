import '../App.css';
import './Description.css'

function Description() {
  return(
    <div className='background'>
      <div className='description-container'>
        <h1>About Us</h1>
        <h2>Built by Sahel, Chris, and Mikayla Abraham, ARDENT is an AI powered chatbot made for getting
          new information and clinical trials relating to rare diseases.
        </h2>
        <h2> </h2>
        <h2>Rare diseases are defined as illnesses with under 200,000 cases in the United States, but due to the low amount
          of people affected, less than 10% of these rare diseases have an FDA approved treatment. For the over 25 million
          Americans afflicted by one of the over 7,000 rare diseases, clinical trials and research groups are the only
          options left.
        </h2>
        <h2> </h2>
        <h2>ARDENT uses the Google Gemini API to provide the latest research and data about rare diseases to those who
          need it, and serves to connect potential patients with the clinical trials that could possibly provide a solution.
        </h2>
      </div>
    </div>
  )
}

export default Description;