import PropTypes from 'prop-types'

const Me = ({ lastName }) => {
  return <div>Me, lastName: {lastName}</div>
}
Me.propTypes = {
  lastName: PropTypes.string.isRequired,
}

const Father = ({ lastName }) => (
  <div>
    Father -&gt; <Me lastName={lastName} />
  </div>
)
Father.propTypes = {
  lastName: PropTypes.string.isRequired,
}

const Grandpa = ({ lastName }) => (
  <div>
    Grandpa -&gt; <Father lastName={lastName} />
  </div>
)
Grandpa.propTypes = {
  lastName: PropTypes.string.isRequired,
}

const LastNameWithoutContext = () => (
  <div className="last-name-example">
    <Grandpa lastName="Wen" />
  </div>
)

export default LastNameWithoutContext
