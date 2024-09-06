import React from 'react';
import '../../App.css';
import Hero from '../Hero';
import { useSelector } from 'react-redux'
import { useToaster, Notification } from 'rsuite';

function Home() {
  const notifier = useSelector((state) => state.NotificationReducer)
  const toaster = useToaster();

  return (
    <>
      <Hero />
      {/* {notifier != null & notifier.notification.notifyFlag === "error" ? 
        toaster.push(<Notification type="error" header={notifier.notification.notifyFlag} closable>
            {notifier.notification.notifyMessage}
        </Notification>, {label: 'topEndbottomEnd', value: 'bottomEnd'})
        : toaster.push(<Notification type="success" header={notifier.notification.notifyFlag} closable>
            {notifier.notification.notifyMessage}
        </Notification>, {label: 'bottomEnd', value: 'bottomEnd'})} */}
    </>
  );
}

export default Home;