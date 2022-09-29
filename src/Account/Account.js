import { View, Text, StyleSheet, TextInput, Platform, PermissionsAndroid, BackHandler, DeviceEventEmitter, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FusedLocation from 'react-native-fused-location';
import MapViewDirections from 'react-native-maps-directions';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { GooglePlacesAutocomplete, geocodeByAddress, getLatLng } from 'react-native-google-places-autocomplete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Account({ route }) {
    const [number, onChangeNumber] = React.useState(null);
    const [latitudeCurrent, setLatitudeCurrent] = React.useState(37.78825);
    const [longitudeCurrent, setLongitudeCurrent] = React.useState(-122.4324);
    const _mapView = useRef(null);

    const [destination, setDestination] = React.useState(null);
    const test = { latitude: 21.006694, longitude: 105.8072816 }
    let subscription;
    const ref = useRef();
    console.log("account", route);

    async function requestPermissions() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
        }

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'App needs to access your location',
                message: 'App needs access to your location ' +
                    'so we can let our app be even more awesome.'
            }
            );
            if (granted) {
                FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);

                // Get location once.
                const location = await FusedLocation.getFusedLocation();
                setLatitudeCurrent(location.latitude)
                setLongitudeCurrent(location.longitude)

                // Set options.
                FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
                FusedLocation.setLocationInterval(20000);
                FusedLocation.setFastestLocationInterval(15000);
                FusedLocation.setSmallestDisplacement(10);


                // Keep getting updated location.
                FusedLocation.startLocationUpdates();

                // Place listeners.
                subscription = FusedLocation.on('fusedLocation', location => {
                    /* location = {
                      latitude: 14.2323,
                      longitude: -2.2323,
                      speed: 0,
                      altitude: 0,
                      provider: 'fused',
                      accuracy: 30,
                      bearing: 10,
                      mocked: false,
                      timestamp: '1513190221416'
                    }
                    */
                    console.log(location);
                });

                /* Optional
                this.errSubscription = FusedLocation.on('fusedLocationError', error => {
                    console.warn(error);
                });
                */
            }
        }
    }

    useEffect(() => {
        ref.current?.setAddressText('');
    }, []);

    useEffect(() => {
        requestPermissions()
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
            providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
        }).then(function (success) {
            console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
            requestPermissions()
        }).catch((error) => {
            console.log(error.message); // error.message => "disabled"
        });

        BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
            //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
            LocationServicesDialogBox.forceCloseDialog();
        });
        DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
            console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        });

        return () => {
            FusedLocation.off(subscription);
            // FusedLocation.off(this.errSubscription);
            FusedLocation.stopLocationUpdates();
            LocationServicesDialogBox.stopListener();
        }

    }, [])


    console.log("destination", destination)
    return (
        <View style={styles.container}>


            <MapView
                ref={_mapView}
                showsUserLocation={true}
                showsMyLocationButton={false}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: latitudeCurrent,
                    longitude: longitudeCurrent,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

                <MapViewDirections
                    origin={{
                        latitude: latitudeCurrent,
                        longitude: longitudeCurrent,
                    }}
                    destination={destination}
                    apikey={"AIzaSyAytyTSHvHEkBktQJ3WmYEETH6A8xxkMyg"}
                    strokeWidth={4}
                    strokeColor="#111111"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
                        _mapView.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 30,
                                bottom: 100,
                                left: 30,
                                top: 100
                            }
                        })
                    }}
                    language={"vi"}
                    resetOnChange={true}
                />
                {destination &&
                    <Marker
                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                    />
                }

            </MapView>

            <View style={styles.header}>
                <View style={styles.search}>

                    {/* <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="Tên sân hay quận"
                        placeholderTextColor={"black"}
                    /> */}
                    <GooglePlacesAutocomplete
                        ref={ref}
                        styles={{
                            container: {
                                flex: 1,
                                marginTop: 15,
                                marginLeft: 10,

                            },
                            textInputContainer: {
                                flexDirection: 'row',
                            },
                            textInput: {
                                backgroundColor: 'white',
                                height: 44,
                                borderRadius: 5,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                fontSize: 15,
                                color: "black",
                                flex: 1,
                            },
                            poweredContainer: {
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderColor: 'black',
                                borderTopWidth: 0.5,
                                color: "black"
                            },
                            powered: {},
                            listView: {},
                            row: {
                                backgroundColor: 'white',
                                padding: 13,
                                height: 44,
                                flexDirection: 'row',
                                color: "black"
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: 'black',
                                color: "black"
                            },
                            description: {
                                color: "black"
                            },
                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                            predefinedPlacesDescription: {
                                color: "black"
                            }
                        }}
                        placeholder='Tìm kiếm ở đây'
                        textInputProps={{
                            placeholderTextColor: 'black',
                            returnKeyType: "search",
                            paddingLeft: 35
                        }}
                        fetchDetails={true}
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log("dataaaaâ", data);
                            console.log("detailssssssssssss", details?.geometry?.location);
                            let location = details?.geometry?.location
                            setDestination({
                                latitude: location.lat, longitude: location.lng
                            })
                            _mapView.current.animateToRegion({
                                latitude: latitudeCurrent,
                                longitude: longitudeCurrent,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }, 1000)

                        }}
                        query={{
                            key: 'AIzaSyAytyTSHvHEkBktQJ3WmYEETH6A8xxkMyg',
                            language: 'vi',
                        }}
                    />
                    <Icon
                        name="search1"
                        size={20}
                        style={styles.itemButtonSearch}
                        color={"black"}
                    >
                    </Icon>
                </View>
                <Icon
                    name="plus"
                    size={35}
                    style={styles.itemButton}
                    color={"#f99809"}
                >
                </Icon>
            </View>

            <TouchableOpacity
                style={styles.myLocationButton}
                onPress={() => _mapView.current.animateToRegion({
                    latitude: latitudeCurrent,
                    longitude: longitudeCurrent,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }, 1000)}>
                <MaterialCommunityIcons name='crosshairs-gps' size={24} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        // zIndex: 9999
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: "white",
        color: "black",
        position: "relative",
        borderRadius: 30,
        flex: 1,
        paddingLeft: 40
    },
    itemButtonSearch: {
        position: "absolute",
        top: 25,
        left: 20
    },
    itemButton: {
        flex: 0.15,
        position: "absolute",
        top: 20,
        right: 10
    },
    search: {
        flex: 0.85,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    myLocationButton: {
        backgroundColor: "gray",
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 15,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 50
    }
})