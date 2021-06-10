import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const alerts = useSelector((state) => state.alert)

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`mt-100 container alert alert-${alert.alertType}`}>
        <p>{alert.msg}</p>
      </div>
    ))
  )
}

export default Alert
