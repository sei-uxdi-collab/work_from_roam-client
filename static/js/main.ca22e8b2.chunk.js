(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,a){e.exports=a(42)},21:function(e,t,a){},22:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),c=(a(21),a(1)),s=a(2),l=a(4),u=a(3),p=a(5),h=(a(22),a(12)),d=a.n(h),m=a(15),f=a(10),b=a.n(f),g=a(7),v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).setQuery=function(e){a.setState({query:e})},a.handleAutocompleteSelect=function(){var e=Object(m.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.geocodeByAddress)(t);case 2:return n=e.sent,e.next=5,Object(f.getLatLng)(n[0]);case 5:r=e.sent,a.props.setApp({coordinates:r}),a.props.setApp({placeData:n[0]});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={query:""},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(b.a,{value:this.state.query,onChange:this.setQuery,onSelect:this.handleAutocompleteSelect},(function(e){var t=e.getInputProps,a=e.suggestions,n=e.getSuggestionItemProps,o=e.loading;return r.a.createElement("div",null,r.a.createElement("input",Object.assign({style:{height:"40px",width:"100%",fontSize:"16px"}},t({placeholder:"Search Places ...",className:"location-search-input"}))),r.a.createElement("div",{className:"autocomplete-dropdown-container"},o&&r.a.createElement("div",null,"Loading..."),a.map((function(e){var t=e.active?"suggestion-item--active":"suggestion-item",a=e.active?{backgroundColor:"#fafafa",cursor:"pointer"}:{backgroundColor:"#ffffff",cursor:"pointer"};return r.a.createElement("div",n(e,{className:t,style:a}),r.a.createElement("span",null,e.description))}))))}))}}]),t}(r.a.Component),O=Object(g.GoogleApiWrapper)({apiKey:"AIzaSyBr0KBe6OYC3MKAmWh4nfTPQrCQT6ei-O8"})(v),j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={test:!0},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"test component"),r.a.createElement("p",null,this.props.placeData.formatted_address),r.a.createElement("a",{href:"https://developers.google.com/maps/documentation/javascript/tutorial",target:"_blank"},r.a.createElement("button",null,"display link to create a review")),r.a.createElement("p",null,this.props.placeData.place_id))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onMarkerClick=function(e,t,n){a.setState({selectedMarker:t,showWindow:!0})},a.onInfoWindowClose=function(){a.setState({showWindow:!1})},a.state={showWindow:!1,selectedMarker:null},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(g.Map,{google:this.props.google,center:this.props.coordinates,initialCenter:this.props.initialCenter,zoom:14,clickableIcons:!0},r.a.createElement(g.Marker,{onClick:this.onMarkerClick,position:this.props.coordinates,name:"Current location"}),r.a.createElement(g.InfoWindow,{marker:this.state.selectedMarker,position:this.props.coordinates,visible:this.state.showWindow,onClose:this.onInfoWindowClose},r.a.createElement(j,{placeData:this.props.placeData})))}}]),t}(r.a.Component),w=Object(g.GoogleApiWrapper)({apiKey:"AIzaSyBr0KBe6OYC3MKAmWh4nfTPQrCQT6ei-O8"})(k),E=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={coordinates:{lat:null,lng:null},placeData:"",userLocation:{lat:42.3601,lng:-71.0589}},e}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(O,{setApp:this.setState.bind(this)}),r.a.createElement(w,{initialCenter:this.state.userLocation,coordinates:this.state.coordinates,placeData:this.state.placeData}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[16,1,2]]]);
//# sourceMappingURL=main.ca22e8b2.chunk.js.map