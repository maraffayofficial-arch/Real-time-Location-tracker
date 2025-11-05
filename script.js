const socket =io()

console.log('Hey this is script js')

if (navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
const {latitude,longitude}=   position.coords
socket.emit("send-location",{longitude,latitude})},

(error)=>{
    console.log(error)
},

{
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0,
}

   )

}

const map=L.map("map").setView([0,0],16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:"OpenStreetMap"
}).addTo(map)


const marker={}
const colors = ['blue', 'red', 'green', 'orange', 'violet', 'yellow']
let colorIndex = 0
socket.on("Location-received",(data)=>{
    const{id,latitude,longitude}=data
if (id==socket.id) {
    map.setView([latitude,longitude],16)
    
}

if(marker[id]){
    marker[id].setLatLng([latitude,longitude])
    
}
else{
    marker[id]=L.marker([latitude,longitude])
    .bindPopup(`User: ${id.substring(0, 8)}...`)
    .addTo(map)

 const color = colors[colorIndex % colors.length]
        colorIndex++
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white;"></div>`,
            iconSize: [25, 25]
        })}
console.log('Total markers on map:', Object.keys(marker).length)
})





socket.on("user-disconnected",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id])
        delete marker[id]
    }
})

