import { Popover, Whisper, Button, InlineEdit, Loader } from 'rsuite';
import { React, useState, forwardRef, useEffect } from 'react';
import './SubscribeEmail.css';
import { db } from "../../firebase/firebase";
import { useToaster, Notification } from 'rsuite';
import { collection, addDoc } from "firebase/firestore";

const addDataToFirestore = async (data) => {
    try {
      await addDoc(collection(db, "Subscriber_Email"), data);
    } catch (e) {
      console.error("Error adding email subscription: ", e);
    }
};

const EmailSubscriberComponent = forwardRef(({ content, ...props }, ref) => {
    const [subscriberEmail, setSubscriberEmail] = useState("");
    const [secretValue, setSecretValue] = useState({});
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const toaster = useToaster();

    const storeSubscriberEmail = async (value) => {
        if (!emailRegex.test(value)) {
            toaster.push(
                <Notification type="warning" header="Enter valid email" closable>
                  Please correct the entered email: <i>{value}</i>!!
                </Notification>,
                { placement: 'bottomEnd' }
            );
        } else {
            setSubscriberEmail(value);
            // Save to Firestore
            try {
                // await db.collection("User_Subscriber").add({ value });
                addDataToFirestore({"email" : value, "subscription_request_ts" : new Date().toISOString()});
                toaster.push(
                    <Notification type="success" header="Subscription complete" closable>
                      Thank you for subscribing.
                      We will email you at the provided email: <i>{value}</i> when new updates are released.
                    </Notification>,
                    { placement: 'bottomEnd' }
                );
            } catch (error) {
                console.log('An error occurred while setting up email subscription. Error: ', error)
                toaster.push(
                    <Notification type="error" header="Subscription error" closable>
                      Subscription failed. Please try again later.
                    </Notification>,
                    { placement: 'bottomEnd' }
                );
            }
        }
    };

    return (
        <div className="flex-container">
            <div className="flex-child-left">
                <InlineEdit
                    defaultValue="Enter @email"
                    onChange={(value) => setSubscriberEmail(value)} // Update state on change
                >
                    {(props, ref) => {
                        const { value, onChange, plaintext, ...rest } = props;

                        if (plaintext) {
                            return <span>{value}</span>;
                        }

                        return (
                            <input
                                {...rest}
                                type="text"
                                ref={ref}
                                value={subscriberEmail} // Controlled input
                                onChange={(event) => onChange(event.target.value)}
                            />
                        );
                    }}
                </InlineEdit>
            </div>
            <div className="flex-child-right">
                <Button
                    appearance="ghost"
                    onClick={() => storeSubscriberEmail(subscriberEmail)} // Use onClick
                >
                    Subscribe
                </Button>
            </div>
        </div>
    );
});

const DefaultPopover = forwardRef(({ content, ...props }, ref) => {
    return (
        <Popover ref={ref} title="Subscribe by email" {...props}>
            <EmailSubscriberComponent {...props} />
        </Popover>
    );
});

const PopoverWithLoader = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <Popover ref={ref} {...props}>
            {loading ? <Loader content="Loading..." /> : <EmailSubscriberComponent {...props} />}
        </Popover>
    );
});

const CustomComponent = ({ placement, loading, children }) => {
    return (
        <Whisper
            trigger="click"
            placement={placement}
            controlId={`control-id-${placement}`}
            speaker={loading ? <PopoverWithLoader /> : <DefaultPopover />}
        >
            <Button appearance="ghost">{children || placement}</Button>
        </Whisper>
    );
};

function SubscribeEmail() {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <CustomComponent placement="bottomStart" loading={loading}>
                Subscribe
            </CustomComponent>
        </div>
    );
}

export default SubscribeEmail;
