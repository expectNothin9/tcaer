import PropTypes from 'prop-types'

const DayNightEmoji = () => {
  const date = new Date()
  const hour = date.getHours()
  return hour >= 6 || hour < 18 ? <span>🌞</span> : <span>🌙</span>
}

const DevButton = () => (
  <button onClick={(event) => console.log(event.target.innerHTML)}>Dev Button</button>
)

const Greeting = ({ userName, withDayNight }) => (
  <>
    <h1>
      {withDayNight && <DayNightEmoji />}
      Hello, {userName}
    </h1>
    <h2>Start editing to see some magic happen!</h2>
    <DevButton />
  </>
)
Greeting.propTypes = {
  userName: PropTypes.string.isRequired,
  withDayNight: PropTypes.bool,
}
Greeting.defaultProps = {
  withDayNight: true,
}

export default Greeting
