import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../../../../services/utils/data-manipulation-utilits";
import { iFullShortletInfo } from "../../../host/add-stay/add-shortlet/add-shortlet-data";

export const formatTime = (time: string, shortened?: boolean) => {
    if(!time) {
        return '';
    }
    let timeArray;
    if(shortened) {
        timeArray = time.split(':');
    } else {
        timeArray = time.split('T')[1].split(':');
    }
    const section = parseFloat(timeArray[0]) > 11 ? 'pm' : 'am'
    let hour = parseFloat(timeArray[0]) > 12 ? (parseFloat(timeArray[0]) - 12) : parseFloat(timeArray[0]) === 0 ? 12 : timeArray[0]
    return `${hour} : ${timeArray[1]} ${section}`;
}

export const calculatePrice = (stay: iFullShortletInfo | undefined) => {
    if(!stay) {
        return '';
    }
    if(stay.single) {
        return formatNumber(parseFloat(stay.single_price || ''));
    } else if(stay.suites) {
        return formatNumber(parseFloat(stay.suites_price || ''));
    } else if(stay.executive) {
        return formatNumber(parseFloat(stay.executive_price || ''));
    } else if(stay.double_chambers) {
        return formatNumber(parseFloat(stay.double_chambers_price || ''));
    }
}

export const calculatePriceRaw = (stay: iFullShortletInfo | undefined) => {
    if(!stay) {
        return '';
    }
    if(stay.single) {
        return parseFloat(stay.single_price || '');
    } else if(stay.suites) {
        return parseFloat(stay.suites_price || '');
    } else if(stay.executive) {
        return parseFloat(stay.executive_price || '');
    } else if(stay.double_chambers) {
        return parseFloat(stay.double_chambers_price || '');
    }
}

export const generateRatingStars = (rating: number) => {
    const ratingList = [];
    for(let i = 0; i < (rating || 0); i++) {
        ratingList.push(i);
    }
    return ratingList.map((item, index) => <FontAwesomeIcon icon={'star'} key={index} className="orange-tx" />);
}

export const selectAppartmentCategory = (stay: iFullShortletInfo | undefined): { type: string, count: number } => {
    let category = {
        type: '',
        count: 0,
    };
    if(!stay) {
        return category;
    }
    if(stay.single) {
        category = { type: 'Single', count: stay.single };
    } else if(stay.suites) {
        category = { type: 'Suites', count: stay.suites };
    } else if(stay.executive) {
        category = { type: 'Executive', count: stay.executive };
    } else if(stay.double_chambers) {
        category = { type: 'Double Chambers', count: stay.double_chambers };
    }
    return category;
}
export const countAppartmentFeatures = (stayData: iFullShortletInfo | undefined) => {
    let featureCount = 0;

    if(!stayData){
        return featureCount;
    }
    
    if(stayData.bedrooms) featureCount += 1;
    if(stayData.bathrooms) featureCount += 1;
    if(stayData.parking) featureCount += 1;
    if(stayData.pool) featureCount += 1;
    if(stayData.bathtube) featureCount += 1;
    if(stayData.bidet) featureCount += 1;
    if(stayData.body_soap) featureCount += 1;
    if(stayData.cleaning_products) featureCount += 1;
    if(stayData.hot_water) featureCount += 1;
    if(stayData.bed_linens) featureCount += 1;
    if(stayData.clothing_storage) featureCount += 1;
    if(stayData.drying_rack) featureCount += 1;
    if(stayData.essentials) featureCount += 1;
    if(stayData.extra_pillows) featureCount += 1;
    if(stayData.free_dryer) featureCount += 1;
    if(stayData.free_washer) featureCount += 1;
    if(stayData.hangers) featureCount += 1;
    if(stayData.iron) featureCount += 1;
    if(stayData.darkening_shades) featureCount += 1;
    if(stayData.archade_games) featureCount += 1;
    if(stayData.bluetooth) featureCount += 1;
    if(stayData.reading) featureCount += 1;
    if(stayData.game_console) featureCount += 1;
    if(stayData.ping_pong_table) featureCount += 1;
    if(stayData.pool_table) featureCount += 1;
    if(stayData.tv) featureCount += 1;
    if(stayData.ac) featureCount += 1;
    if(stayData.fans) featureCount += 1;
    if(stayData.monoxide_alarm) featureCount += 1;
    if(stayData.fire_extinguisher) featureCount += 1;
    if(stayData.first_aid_kit) featureCount += 1;
    if(stayData.security_cameras) featureCount += 1;
    if(stayData.smoke_alarm) featureCount += 1;
    if(stayData.dedicated_workspace) featureCount += 1;
    if(stayData.wifi) featureCount += 1;
    if(stayData.bbq_grill) featureCount += 1;
    if(stayData.outdoor_dining) featureCount += 1;
    if(stayData.outdoor_furniture) featureCount += 1;
    if(stayData.patio_balcony) featureCount += 1;
    if(stayData.backyard_fenced) featureCount += 1;
    if(stayData.carpot) featureCount += 1;
    if(stayData.street_parking) featureCount += 1;
    if(stayData.private_pool) featureCount += 1;
    if(stayData.lockbox) featureCount += 1;
    if(stayData.self_checkin) featureCount += 1;

    return `${featureCount}+ Feature${featureCount !== 1 ? 's' : ''}`;
}


export const sampleStays = [];

export const reviewProcessor = (reviewList: any[]) => {
    return {
        comment: 'Very Good',
        count: 321,
        rating: 4.1,
    }
}

interface iStayBookingForm {
    check_in_date: string,
    check_out_date: string,
    check_in_time: string, 
    check_out_time: string,
}
export const calculateLengthOfStay = (bookingInfo: iStayBookingForm) => {
    if(!bookingInfo.check_in_date || !bookingInfo.check_out_date) {
        return 0;
    }
    const duration = new Date(bookingInfo.check_out_date).getTime() - new Date(bookingInfo.check_in_date).getTime();
    return Math.ceil(duration / (25 * 60 * 60 * 1000));
}
export const calculateBookingSubtotal = (bookingInfo: any, values: any) => {
    const price = parseFloat(calculatePrice(bookingInfo)?.replace(/,/g, '') + '');
    const stay = calculateLengthOfStay(values);
    return (price * stay)
}