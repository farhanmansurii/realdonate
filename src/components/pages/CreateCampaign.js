import React, { Component } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './style.css';
import API from "../../utils/API";





class DonateForm extends Component {
    state = {
        country: '',
        zipCode: '',
        description: '',
        recipient: '',
        goal: '',
        status: 'Pending',
        amountRaised: '',
        topDonor: '',
        donations: [{
            donorName: '',
            amount: ''
        }],
        agreementAccepted: false,
        show: false
      };

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    loadCampaigns = () => {
        API.getAllCampaigns()
            .then((res) =>
                this.setState({
                    country: 'India',
                    zipCode: 400070,
                    description: 'Help Me!',
                    recipient: '',
                    goal: '10000',
                    status: 'Pending',
                    amountRaised: '1000',
                    topDonor: 'John Doe',
                    donations: [{
                        donorName: 'John Doe',
                        amount: 100
                    }]
                })
            )
            .catch((err) => console.log(err));
    }

    handleFormSubmit = (event) => {
        // event.preventDefault();
        if (this.validateForm()) {
            API.saveCampaign({
                country: this.state.country,
                zipCode: this.state.zipCode,
                description: this.state.description,
                recipient: this.state.recipient,
                goal: this.state.goal,
                status: this.state.status,
                amountRaised: this.state.amountRaised,
                topDonor: this.state.topDonor,
                donations: [{
                    donorName: this.state.donorName,
                    amount: this.state.amount
                }]
              })
                .then((res) => { this.loadCampaigns() })
                .catch((err) => console.log(err));
        }
    }

    validateForm() {
        return this.state.agreementAccepted && this.state.country && this.state.zipCode && this.state.description &&
            this.state.recipient && this.state.goal && this.state.status;
    }

    handleCountryChange = (e) => {
        this.setState({ country: e.target.value });
    };

    handleZipCodeChange = (e) => {
        this.setState({ zipCode: e.target.value });
    };

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }

    handleRecipientChange = (e) => {
        this.setState({ recipient: e.target.value })
    }

    handleGoalChange = (e) => {
        this.setState({ goal: e.target.value })
    }

    handleAgreementAcceptedChange = (e) => {
        this.setState({ agreementAccepted: e.target.checked })
    }

    render() {
        return (
            <div className="page_inner_div" id="donate_grid">
                <h1 style={{ fontWeight: "900", textAlign: "center" }}>Create A Campaign</h1>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Where will the funds go?</Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="country">
                            <Form.Control type="text" value={this.state.country} onChange={this.handleCountryChange} placeholder="Country" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="zipCode">
                            <Form.Control type="text" value={this.state.zipCode} onChange={this.handleZipCodeChange} placeholder="Zip Code" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="description">
                        <Form.Label>What best describes why you're fundraising?</Form.Label>
                        <Form.Control value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="recipient">
                            <Form.Label>Who are you raising the funds for?</Form.Label>
                            <Form.Control as="select" onChange={ this.handleRecipientChange }>
                                <option value="">Choose...</option>
                                <option value="Yourself">Yourself</option>
                                <option value="Someone Else">Someone Else</option>
                                <option value="Charity">Charity</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="goal">
                        <Form.Label>Your starting donation goal?</Form.Label>
                        <Form.Control value={this.state.goal} onChange={ this.handleGoalChange } placeholder="$ USD" />
                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Button variant="outline-primary" onClick={() => { this.handleModal() }}>View Agreement</Button>
                        <Form.Check type="checkbox" checked={this.state.agreementAccepted} onChange={ this.handleAgreementAcceptedChange } label="I read the Disclosure and Agreed to the Terms" />
                    </Form.Group>

                    <Button variant="outline-dark" type="submit">
                        <Link
                            onClick={this.handleFormSubmit}
                            className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                            to="/donateform"
                        >
                            Submit
                        </Link>
                    </Button>
                </Form>


                <Modal show={this.state.show} onHide={() => this.handleModal()} >
                    <Modal.Header closeButton>
                        <Modal.Title>Donation Agreement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: "9px" }}>
                        <p>
                            This Gift/ Donation Agreement (“Agreement”) is made this ____ day of _______ between [Donor’s Names] and their assignee (hereinafter referred to as “the Donor”), and [Your Organization] an [arts nonprofit organization located in Indianapolis, Indiana]. The Donor and [Your Organization] agree as follows:
                            </p>
                        <p>

                            Donor Commitment. The Donor hereby pledges to [Your Organization] the sum of [insert amount] or more, which as provided for herein is designated for the benefit of [Fund Name] Endowment.
                            Donor Purpose.
                            Purpose. It is understood and agreed that the gift will be used for the following purpose or purposes: To establish an endowment from which the annual interest earnings will be used to [state purpose].
                            Payment. It is further understood and agreed that the gift will be paid in full on or before [insert date].
                            </p>
                        <p>
                            It is also understood and agreed that the gift funds as received may be invested by a third-party that shall best determine investment options for this endowment fund (see item #4 below). The spending policy for the endowment will be the policy set forth and approved by [Your Organization] Board of Directors which will likely include the use of annual interest earnings only and not invade the principal of the fund to protect and perpetuate growth.
                            </p>



                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default DonateForm;