// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointment, starButtonClicked} = props
  const {title, date, id, isStarred} = appointment

  const starClicked = () => {
    starButtonClicked(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <div className="appointment-container">
      <div className="appointment">
        <p className="appointment-name">{title.toUpperCase()}</p>
        <button
          type="button"
          className="appointment-star-button"
          onClick={starClicked}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="appointment-time">{date}</p>
    </div>
  )
}

export default AppointmentItem
