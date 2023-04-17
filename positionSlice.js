import { createSlice, PayloadAction } from "@reduxjs/toolkit"




const initialState = {

    departureLongitude: -4.000540,
    departureLatitude: 5.353854 ,
    arrivedLongitude: 0,
    arrivedLatitude: 0,
    departureAddress: "",
    destinationAddress: "",
    isVtc: false

}
const positionSlice = createSlice( {
    name: 'Position',
    initialState,

    reducers: {
        setDepartureLongitudePosition: (state, action ) => {
            state.departureLongitude = action.payload
        },

        setDepartureLatitudePosition: (state, action) => {
            state.departureLatitude = action.payload
        },
        setArrivedLongitudePosition(state, action ) {
            state.arrivedLongitude = action.payload
        },
        setArrivedLatitudePosition(state, action ) {
            state.arrivedLatitude = action.payload
        },
        setDepartureAddress(state, action){
            state.departureAddress = action.payload
        },
        setDestinationAddress(state, action) {
            state.destinationAddress= action.payload
        },
        setisVtc(state, action){
            state.isVtc = action.payload
        }
        

        
    }
});

export const {setDepartureLatitudePosition, setDepartureLongitudePosition,  setDestinationAddress, setDepartureAddress, setisVtc,  setArrivedLatitudePosition, setArrivedLongitudePosition} = positionSlice.actions

export default positionSlice.reducer;



