export default function noGroundCollision(entityA) {
 let states = entityA.get('states')
 if(states && states.values && states.values.grounded){
     states.values.grounded="false";
 }
}
