import React, { useState } from 'react';
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCarousel,
	CCarouselCaption,
	CCarouselControl,
	CCarouselIndicators,
	CCarouselInner,
	CCarouselItem,
	CCol,
	CRow
} from '@coreui/react';

class Carousels extends React.Component {
	constructor(props) {
		super(props);
		// {
		// 	this.state = {
        // activeIndex: 0,
		// 		photos: [
        //   {"url":  " https://ethos-photos.s3.ap-south-1.amazonaws.com/default_dp.png"},
        // ]
		// 	};
		// }
	}
	render() {
		return (
			<div></div>
			// <CRow>
			// 	<CCol xs="12" xl="6">
			// 		<CCard>
			// 			<CCardHeader>Trip Photos</CCardHeader>
			// 			<CCardBody>
			// 				<CCarousel activeIndex={activeIndex}>
			// 					<CCarouselIndicators />
			// 					<CCarouselInner>
			// 						{this.state.photosmap(([ key, value ], index) => {
            //         this.setState({activeIndex: index})
			// 							return (
			// 								<CCarouselItem key={index.toString()}>
			// 									<img className="d-block w-100" src={value} alt="slide 1" />
			// 									<CCarouselCaption>
			// 										<h3>Photo {index + 1}</h3>
			// 									</CCarouselCaption>
			// 								</CCarouselItem>
			// 							);
			// 						})}
			// 					</CCarouselInner>
			// 					<CCarouselControl direction="prev" />
			// 					<CCarouselControl direction="next" />
			// 				</CCarousel>
			// 			</CCardBody>
			// 		</CCard>
			// 	</CCol>
			// </CRow>
		);
	}
}

export default Carousels;
