import {React, useState, useEffect, forwardRef, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../nav/SideBarNav.js'
import '../Workspace-Component.css'
import { Panel, Loader, Card, Heading, Text, Form, Button, Divider, CardGroup, VStack, HStack, IconButton, Input } from 'rsuite';
import axios from 'axios';
import { setUserWishlist, addUserWishlist, resetUserWishlist, incrementVoteUserWishlist } from "../../../reducer/UserWishlistReducer"
import { SchemaModel, StringType } from "schema-typed"
import PlusIcon from '@rsuite/icons/Plus';
export default function Wishlist(){
    const [columns, setColumns] = useState(3);
    const [spacing, setSpacing] = useState(20);
    const ardentWebAppUrl = useSelector((state) => state.notification.initialization.ardent_web_app_url)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const userWishlistItems = useSelector((state) => state.userWishlist.wishlist)
    const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
    const wishlistFormRef =useRef()
    const [wishlistItemValue, setWishlistItemValue] = useState({ 
        user_name: "", 
        wishlist_item_title: "",
        wishlist_item_description: "",
        created_date: "",
        num_votes: 0
    }) 
    useEffect(() => {
        try {
            let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
            const headers = {
                "Content-Type": "application/json",
            };
            axios.get(ARDENT_WEB_APP_URL + "/services/wishlist/user_all", {headers})
            .then(response => {
                console.log(response.data);
                if(parseInt(response.status)===200){
                    // let processed_resp = extractSearchResults(response.data, clinicalTrialsSearchFormInput.formInput.rdQuestion + clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry)
                    let processed_resp = response.data
                    dispatch(setUserWishlist(processed_resp))
                }
                setIsLoading(false)
              })
              .catch(error => {
                  console.log(error);
              });
            } catch (error) {
            console.log('An error occurred while fetching user wishlist', error)
            }
    }, [])

    // Model using schema model to validate 
    // the data taken in the form 
    const wishlistModel = SchemaModel({     
        wishlist_item_title: StringType()         
        .isRequired("This field is required"), 
        wishlist_item_description: StringType()         
        .isRequired("This field is required"),
        user_name: StringType()         
        .isRequired("This field is required"),            
    });

    //Wishlist items creation and saving
    const createWishlistItem = (e) => {
        setIsLoading(true)
        if (!wishlistFormRef.current.check()) { 
            console.error("Form error") 
            return
        }
        
        try {
            let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
            const headers = {
                "Content-Type": "application/json",
            };

            let wishlist_data = {
                user_name: wishlistItemValue.user_name,
                wishlist_item_title : wishlistItemValue.wishlist_item_title,
                wishlist_item_description : wishlistItemValue.wishlist_item_description,
                created_date: wishlistItemValue.created_date,
                num_votes: wishlistItemValue.num_votes,
                user_names_votes: [wishlistItemValue.user_name]
            }

            axios.post(ARDENT_WEB_APP_URL + "/services/wishlist/post_wishlist_item", wishlist_data, {headers})
            .then(response => {
                console.log(response.data);
                if(parseInt(response.status)===200){                                        
                    dispatch(addUserWishlist(wishlist_data))
                }
                setIsLoading(false)
              })
              .catch(error => {
                  console.log(error);
              });
        } catch (error) {
        console.log('An error occurred while posting wishlist items', error)
        }   
    };

    const voteWishlistItem = (item) => {
        console.log('Voting for item: ', item)
        try {
            let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
            const headers = {
                "Content-Type": "application/json",
            };
            axios.patch(ARDENT_WEB_APP_URL + "/services/wishlist/user/" + item.user_name + "/id/" + item.id, {headers})
            .then(response => {
                console.log(response.data);
                if(parseInt(response.status)===200){                                        
                    dispatch(incrementVoteUserWishlist(item))
                }
                setIsLoading(false)
              })
              .catch(error => {
                  console.log(error);
              });            
        } catch (error) {
            console.log('An error occurred while posting vote for wishlist items', error)
        }  
    }

    return (
        <div className="flex-container">
        <div className="flex-child-left">
            <SideBarNav/>
        </div>
        <div style={{ padding: 20 }} className="flex-child-right">
            <div className='wishlist-container'>
                <Panel style={{ padding: 20 }} shaded>
                    <Heading level={4}>Tell us what you want to see?</Heading>
                    <Text style={{ paddingTop: 20, paddingBottom: 20 }}>
                        What would you want to see on this site. Making information avaialble is but one
                        aspect of the problem and we strive to put together information from as many sources
                        as possible. If there are more sources of information that you want to see here, please
                        add a request.
                    </Text>
                    <Text style={{ paddingTop: 20, paddingBottom: 20 }}>
                        AI/ML models can be used to predict the success of various clinical trial efforts, drug pipelines etc. 
                        While we are working on predictive models, if there are any specific models that you would like to see, 
                        please let us know.
                    </Text>
                    <Text style={{ paddingTop: 20, paddingBottom: 20 }}>
                        GenAI models as well as agentic workflows around LLM seem promising to create unusual insights about 
                        rare diseases, causes and therapies. Most of what you see here use GenAI appraoches coupled with sophisticated
                        data engineering to create answers. If there are any specific insights that you're after, please let us know.
                    </Text>
                </Panel>
                <Panel shaded>
                    {isLoading ? <Loader backdrop size="md" content="Saving wishlist item..." /> : ''}
                    <Form fluid 
                        model={wishlistModel}
                        id="project-form" 
                        onSubmit={createWishlistItem}
                    >
                        <Card width={400} shaded size="lg">
                            <Card.Header>
                                <Heading level={4}>Create Wishlist Item</Heading>
                                <Text muted>Fill in the form below to create a wishlist item</Text>                        
                            </Card.Header>
                            <Card.Body>
                                {/* <Form fluid 
                                    model={wishlistModel}
                                    id="project-form" 
                                    onSubmit={createWishlistItem}> */}
                                <Form.Group>
                                    <Form.ControlLabel>Feature Title:</Form.ControlLabel>
                                    <Form.Control name="wishlist_item_title" placeholder="Please provide a title for the feature" />
                                </Form.Group>
                                <Form.Group controlId="textarea">
                                    <Form.ControlLabel>Feature Description:</Form.ControlLabel>
                                    <Form.Control rows={5} name="wishlist_item_description" placeholder="Enter details about the feature that you want to see" accepter={Textarea}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.ControlLabel>Your name:</Form.ControlLabel>
                                    <Form.Control name="user_name" placeholder="Enter you name (your name will be shown to other users)"/>
                                </Form.Group>
                                {/* </Form>      */}
                            </Card.Body>
                            <Card.Footer>
                                <Button appearance="primary" type="submit" form="project-form">
                                Create
                                </Button>
                                <Button appearance="subtle">Cancel</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </Panel>  
            </div>            
        </div>
        <div style={{ padding: 20 }} className="flex-child-right">
            {isLoading ? <Loader  backdrop size="md" content="Getting User Wishlist..." /> : ''}
            <div>                
                <div className='wishlist-container'>
                    <Panel style={{ padding: 20 }} shaded>
                      
                        <Heading style={{ marginBottom: 10 }} level={4}>User Wishlist</Heading>
                        <CardGroup style={{ marginBottom: 20 }} columns={columns} spacing={spacing}>
                            {userWishlistItems.map((item, index) => (
                                <Form
                                    key={index}
                                    onSubmit={() => voteWishlistItem(item)}
                                >
                                    <Card key={index}>
                                        <Card.Header>
                                            <HStack divider={<Divider vertical />} style={{ height: 40 }}>                                
                                                <Text>Title: {item.wishlist_item_title}</Text>       
                                                <IconButton type="submit" icon={<PlusIcon />}>{item.user_names_votes.length} Vote</IconButton>
                                            </HStack>
                                        </Card.Header>                                                
                                        <Card.Body>
                                            {item.wishlist_item_description}
                                        </Card.Body>
                                        <Card.Footer>
                                            <Text>Submitted by: {item.user_name}</Text>
                                            <Text muted>Date created: {item.created_date}</Text>
                                        </Card.Footer>
                                    </Card>
                                </Form>                                        
                            ))}
                        </CardGroup>
                    </Panel>
                </div>
                <hr />       
            </div>  
        </div>
        </div>    
    );
};
