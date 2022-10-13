import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {title: '', date: '', isStarred: false, appointmentList: []}

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formatDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  starButtonClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !prevState.isStarred}
        }
        return each
      }),
    }))
  }

  filterStarred = () => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.filter(
        each => each.isStarred === true,
      ),
    }))
  }

  render() {
    const {title, date, appointmentList} = this.state
    return (
      <div className="container">
        <div className="card-container">
          <div className="card-content">
            <div className="add-content">
              <h1>Add Appointment</h1>
              <form className="add-input-form" onSubmit={this.onAppointment}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="title-input"
                  id="title"
                  value={title}
                  onChange={this.onChangeTitle}
                />

                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="date-input"
                  id="date"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="add-form-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="main-image"
              />
            </div>
          </div>
          <div>
            <hr className="bar" />
          </div>
          <div className="bottom-content">
            <div className="appointments-starred">
              <h4 className="appointment-subhead">Appointments</h4>
              <button
                type="button"
                className="starred-button"
                onClick={this.filterStarred}
              >
                Starred
              </button>
            </div>
            <div className="appointments">
              {appointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointment={eachAppointment}
                  key={eachAppointment.id}
                  starButtonClicked={this.starButtonClicked}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
