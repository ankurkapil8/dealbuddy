import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import { AllowLocationDialogComponent } from './components/allow-location-dialog/allow-location-dialog.component';
import { ItemInfoDialogComponent } from './components/item-info-dialog/item-info-dialog.component';
// import { SessionDialogComponent } from './components/session-dialog/session-dialog.component';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class Utils2Service {

  public allDealsCollection = [];
  public allWishListCollection = [];
  public allCouponsCollection = [];
  public allEventCollection = [];
  public searchResults = [];

  public filterableButtons =  [
    {  'class': '',  'icon': 'fa-home',  'title': '4 you' },
    {  'class': 'success',  'icon': 'fa-home',  'title': 'All' },
    {  'class': '',  'icon': 'fa-home',  'title': 'Local' },
    {  'class': '',  'icon': 'fa-home',  'title': 'Saved' }
  ];

  public oldFilterButtons = [
    {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
    {  'class': 'bordered',  'icon': 'fa-list-ul',  'title': 'All' },
    {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
    // {  'class': '',  'icon': 'fa-bookmark',  'title': 'Saved' }
  ]

  public userLocationCoords:any = {
    'latitude': '',
    'longitude':''
  };


  public userInteractionIcons = [
    // {   'icon': 'fa-thumbs-up',  'title': '4 you' },
    // {   'icon': 'fa-heart',  'title': 'All'   },
    {   'icon': 'fa-bookmark',  'title': 'bookmark' }
  ];


  public userInformation: any = JSON.parse( localStorage.getItem('user') );
  public showFilterable = true;
  public animal: string;
  public name: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  // private baseUrl = 'http://db20-env.dvyphnsnse.us-east-2.elasticbeanstalk.com/dealbuddy/rest';
  // ec2-3-19-88-48.us-east-2.compute.amazonaws.com
  // http://db20-env.2r3nin39zy.us-east-2.elasticbeanstalk.com
  private baseUrl = 'http://db20-env.2r3nin39zy.us-east-2.elasticbeanstalk.com/dealbuddy/rest';

  // getting data
  public getCouponsUrl    = `${this.baseUrl}/coupons`;
  public getDealsUrl      = `${this.baseUrl}/deals`;
  public getEventsUrl     = `${this.baseUrl}/events`;
  public getAllSavedUrl   = `${this.baseUrl}/global/allSaved`;

  // user auth
  public addNewUser       = `${this.baseUrl}/users`;
  public getUser          = `${this.baseUrl}/users/user`;

  public requestUserCode  = `${this.baseUrl}/users/requestCode`;
  public verifyUserCode   = `${this.baseUrl}/users/verifyCode`;
  public updateUser       = `${this.baseUrl}/users/updateEmail`;

  // more infor
  public searchKeyword    = `${this.baseUrl}/global/search`;

  // bookmarking
  public bookmarkDeals            = `${this.baseUrl}/deals/bookmarkDeal`;
  public deleteBookmarkedDeal     = `${this.baseUrl}/deals/deleteFromBookmark`;
  public dealsByZipCode           =  `${this.baseUrl}/deals/dealsByZipcode`;
  public savedDeals               = `${this.baseUrl}/deals/savedDeals`;
  
  // coupons
  public bookmarkCoupons          = `${this.baseUrl}/coupons/bookmarkCoupon`;
  public deleteBookmarkedCoupons  = `${this.baseUrl}/coupons/deleteCouponFromBookmark`;
  public couponsByZipCode         =  `${this.baseUrl}/coupons/couponsByZipcode`;
  public savedCoupons             = `${this.baseUrl}/coupons/savedCoupons`;

  // events 
  public bookmarkEvents         = `${this.baseUrl}/events/bookmarkEvents`;
  public deleteBookmarkedEvents = `${this.baseUrl}/events/deleteCouponFromEvents`;
  public eventsByZipCode        =  `${this.baseUrl}/events/eventsByZipcode`;
  public savedEvents            = `${this.baseUrl}/events/savedEvents`;


  //wishlists
  public subscriptionsUrl = `${this.baseUrl}/subscriptions`;
  private adminEmail = 'vamsi.katta@gmail.com';

  // DELETE /dealbuddy/rest/coupons/deleteCouponFromBookmark
/*-------------------------------------------------------- misscellenous functions --------------------------------------------------------*/

    convertEpochDateToLocalDate(ts) {

        return new Date( Number(String(ts).substr(0,10))*1000 ).toDateString();
    }

    getUserInfo(){
      let userInfo = JSON.parse( localStorage.getItem('user') );

      if(userInfo){
        return userInfo;
      }

      let userSchema = {

      }

      return userSchema;

    }

    deleteLocally(name){
      localStorage.removeItem(name);
    };

    getLocally(name:string){
      return JSON.parse( localStorage.getItem(name) );
    };

    storeLocally(name:string, data){
        let tmpdata = JSON.stringify( data );

        localStorage.setItem(name, tmpdata);
    }

    pushToCollection(where, data){
      data.map( oneData => where.push(oneData) );
    }


    openDialog(){

      const dialogRef = this.dialog.open(AllowLocationDialogComponent, {
        width: '300px',
        data: {name: this.name, animal: this.animal},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });

    }

    openFeedDialogInfo(feed){
      
      const dialogRef = this.dialog.open(ItemInfoDialogComponent, {
        width: '400px',
        data: feed,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });

    }

    openSessionDialogInfo(any){
      
      // const dialogRef = this.dialog.open(SessionDialogComponent, {
      //   width: '400px',
      //   // data: feed,
      // });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   this.animal = result;
      // });

    }

    openSnackBar(message: string) {
      this.snackBar.open(message, 'Okay', {
        duration: 2000,
        horizontalPosition: 'end'
      });
    }

    isUserOnline(){
      return navigator.onLine;
    }

    getTheUserLocation(){

        if(this.isUserOnline){

            let user =  navigator.geolocation.getCurrentPosition( 
              res=>{

                  this.userLocationCoords.latitude  = res.coords.latitude;
                  this.userLocationCoords.longitude = res.coords.longitude;

                  this.deleteLocally( 'userLocation' );
                  this.storeLocally('userLocation', this.userLocationCoords );
              },
              err=>{
                // this.openDialog();
                return false;
              }
            )

        }else{

          let message = 'Sorry your currently offline, please check your internet connection.';
          this.openSnackBar(message);

        }



    }

    returnMeCollection(){
        return this.allDealsCollection;
    }


    returnLoggedInOrNot(){

        if( localStorage.getItem('user') != null ){

          this.userInformation  = JSON.parse( localStorage.getItem('user') );
          return true;

        }else{
          
          return false;
        }

    }

    validateEmail = (email) => {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
      return expression.test(String(email).toLowerCase())
    }

    returnDefualtImageForSite( base64Image, imageURL ){

      if(
        base64Image === null ||
        imageURL === null 
      ){
        return false;
      }

      if(
        base64Image.length < 7  &&
        imageURL.length < 7
      ){

        return true;
      }

      return false;


    }

 /*-------------------------------------------------------- global api calls --------------------------------------------------------*/

    findMeThisKeyword(pageId,key){

      let parameters =  new HttpParams()
      .set('page', pageId.toString() )
      .set('toBeSearched', key.toString() );

      return this.http.get( this.searchKeyword,  { params: parameters } );
    }


    getAllSavedItems(pageId,key){

      let parameters =  new HttpParams()
      .set('page', pageId.toString() )
      .set('userEmail', this.userInformation.userEmail.toString() );

      return this.http.get( this.searchKeyword,  { params: parameters } ).subscribe(
        res =>{
          this.pushToCollection( this.searchResults, res );
        },
        err =>{
          // console.log( err );
        }
      );

    }



    getAllUserSavedItems(){
      
          let userEmail = this.userInformation === null ? '': this.userInformation.userEmail.toString();

          let parameters =  new HttpParams()
          .set('userEmail',  userEmail );

          // http://db10-env.dvyphnsnse.us-east-2.elasticbeanstalk.com/dealbuddy/rest/global/allSaved?userEmail=henryasante29%40gmail.com

          return this.http.get( this.getAllSavedUrl,  { params: parameters } );
    }

    getSavedItemsByEmail(email){
      
      let parameters =  new HttpParams()
      .set('userEmail', email.toString() );

      return this.http.get( this.getAllSavedUrl,  { params: parameters } );
    }

    bookMarkOrRemoveThisItem( itemId, what, operation, page){


        if(what == 'coupon'){

        
            if(operation == 'delete'){

              let parameters =  new HttpParams()
              .set('page', page.toString() )
              .set('dealId', itemId.toString())
              .set('userEmail', this.userInformation.userEmail.toString() );
          
              return this.http.get( this.searchKeyword,  { params: parameters } );
            }else if(operation == 'add'){

              let parameters =  new HttpParams()
              .set('dealId', itemId.toString())
              .set('userEmail', this.userInformation.userEmail.toString() );
          
              return this.http.get( this.bookmarkCoupons,  { params: parameters } );
            }
        

        }else if(what == 'deals'){

              if(operation == 'delete'){
                let parameters =  new HttpParams()
                .set('page', page.toString() )
                .set('dealId', itemId.toString())
                .set('userEmail', this.userInformation.userEmail.toString() );
            

                // return this.http.delete( this.dealBookmarkedDeals,  { params: parameters } );
              }else if(operation == 'add'){
              
                let parameters =  new HttpParams()
                .set('coupondId', itemId.toString())
                .set('userEmail', this.userInformation.userEmail.toString() );

                return this.http.post( this.bookmarkDeals,  { params: parameters } );
              }

        }



    }

/*-------------------------------------------------------- wishlist/subscriptions api calls --------------------------------------------------------*/


    // get all wishlist by id
    public getAllMyWishlist(pageId){
      this.allCouponsCollection = [];

      let parameters =  new HttpParams()
      .set('page', pageId )
      .set('userEmail', this.userInformation.userEmail.toString() );

      return this.http.get( this.subscriptionsUrl,  { params: parameters } );
    }


    // delete a wishlist by id
    public deleteAWishList( subscrId ){

      //params
      let parameters =  new HttpParams()
      .set('userEmail', this.userInformation.userEmail )
      .set('subscriptionId', subscrId );
      

      let header = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*' )
      .set('Content-Type', 'application/json' )
      .set('Accept', '*/*' );

      let headersH = new Headers({ 'Content-Type': 'application/json', 'Accept': '*/*' });
      
      return this.http.delete(`${this.subscriptionsUrl}`, { params: parameters,  headers: header } );
    }


    // add a wishlist by id
    public addANewWishList( subScriptionBody ){

      let subScription = subScriptionBody;

      //params
      let parameters =  new HttpParams()
      .set('userEmail', this.userInformation.userEmail.toString() );

      return this.http.post( this.subscriptionsUrl, subScription, { params: parameters } );
    }




 /*-------------------------------------------------------- coupoun api calls --------------------------------------------------------*/



    // get all coupons by id
    public getAllCoupons(pageId:any, filter:string){

                this.allCouponsCollection = [];
                let parameters:any;


                // 4you all local saved 
                if(filter === 'localCoupons'){


                      // if the user wants the local deals, first we check wether the users has allowed gps, 
                      if(this.userLocationCoords.latitude !== '' && this.userLocationCoords.longitude !== ''){

                          parameters =  new HttpParams().set('page', pageId)
                          .set('latitude', this.userLocationCoords.latitude.toString() )
                          .set('longitude', this.userLocationCoords.longitude.toString() );

                      }else{

                            this.openDialog();

                            if( this.returnLoggedInOrNot() == true ){

                                  // if not then we call local by zip
                                  this.getLocalCouponsByZipCode();

                            }

                      }


                  
                }else if(filter === 'savedCoupons'){

                      if( this.returnLoggedInOrNot() == true ){

                        parameters =  new HttpParams()
                        .set('page', pageId  )
                        .set('userEmail', this.userInformation.userEmail.toString() );

                      }else{
                        
                        this.openSnackBar('Please signup to access this feature')
                        this.router.navigateByUrl('/profile');
                        filter = undefined;
                      }


                }else if(filter === 'matchedCoupons'){

                      if( this.returnLoggedInOrNot() == true ){

                        parameters =  new HttpParams()
                        .set('page', pageId  )
                        .set('userEmail', this.userInformation.userEmail.toString() );

                      }else{
                        this.openSnackBar('Please signup to access this feature')
                        this.router.navigateByUrl('/profile');
                        filter = undefined;
                      }

                   

                }else if(filter === undefined){
                      filter = undefined;

                      parameters =  new HttpParams()
                      .set('page', pageId )

                }


          // fitered requests
          if(filter != undefined){

                  return this.http.get(`${this.getCouponsUrl}/${filter}`, { params: parameters } );

            // unfitered requests
            }else{

                  return this.http.get( `${this.getCouponsUrl}`, { params: parameters } );
                  
            }

    }


    // get all coupons by id
    public deleteACoupon( couponId, dealerRoleUserEmail ){

                //headers
                let header = new HttpHeaders().set('dealerRoleUserEmail', dealerRoleUserEmail.toString() );
                
                //params
                let parameters =  new HttpParams().set('page', couponId.toString() );

                return this.http.delete( this.getCouponsUrl, { params: parameters, headers: header } );
    }



    // bookmark coupon by the user by clicking bookmark icon
    public bookmarkACoupon(data){

        let parameters =  new HttpParams()
        .set('userEmail', this.userInformation.userEmail.toString() )
        .set('couponId', data.toString() );

        let body =  { 
          userEmail: this.userInformation.userEmail.toString(),
          couponId: data.toString() 
        };

      
        let userEmail = this.userInformation.userEmail.toString();
        let couponId = data.toString();
      
      return this.http.post(`${this.bookmarkCoupons}?userEmail=${userEmail}&couponId=${couponId}`, body);
    }



    // delete coupons saved by the user 
    public deleteACouponBookmark(data){

        let parameters =  new HttpParams()
       .set('userEmail', this.userInformation.userEmail.toString() )
       .set('couponId', data.toString() );

        let userEmail = this.userInformation.userEmail.toString();
        let couponId = data.toString();

        return this.http.delete(`${this.deleteBookmarkedCoupons}?userEmail=${userEmail}&couponId=${couponId}`,  { params: parameters } );
    }



    // get coupons saved by the user 
    public getSavedCoupons(){
 
  
                let parameters =  new HttpParams()
                .set('userEmail', this.userInformation.userEmail.toString() )
          
                return this.http.get(this.savedCoupons, { params: parameters } );
          
    
    }



    // get coupons by user zip code
    public getLocalCouponsByZipCode(){


          if( this.returnLoggedInOrNot() == true ){

                  if( this.userInformation.zipCode !== null ||this.userInformation.zipCode !== undefined ){
                        let parameters =  new HttpParams()
                        .set('zipCode', this.userInformation.zipCode.toString() )
                  
                        return this.http.get( this.couponsByZipCode, { params: parameters } );
                  }

          }else{
            this.openSnackBar('Please signup or allow location to access this feature');
            this.router.navigateByUrl('/profile');
          }
      
   
    }



 /*-------------------------------------------------------- deal api calls --------------------------------------------------------*/




      // get all deals by id
      public getAllDeals(pageId:any, filter:string){
        
        this.allDealsCollection = [];
        let parameters: any;


                  // 4you all local saved 
              if(filter === 'localDeals'){


                    // if the user wants the local deals, first we check wether the users has allowed gps, 
                    if(this.userLocationCoords.latitude === '' && this.userLocationCoords.longitude == ''){

                        this.openDialog();
                        
                        if( this.returnLoggedInOrNot() == true ){

                              // if not then we call local by zip
                              this.getLocalDealsByZipCode();

                        }


                    }else{
                      parameters =  new HttpParams().set('page', pageId)
                      .set('latitude', this.userLocationCoords.latitude.toString() )
                      .set('longitude', this.userLocationCoords.longitude.toString() );
                    }


                
              }else if(filter === 'savedDeals'){


                    if( this.returnLoggedInOrNot() == true ){

                      parameters =  new HttpParams()
                      .set('page', pageId  )
                      .set('userEmail', this.userInformation.userEmail.toString() );

                    }else{
                      this.openSnackBar('Please signup to access this feature')
                      this.router.navigateByUrl('/profile');
                      filter = undefined;
                    }


              }else if(filter === 'matchedDeals'){

                    if( this.returnLoggedInOrNot() == true ){

                      parameters =  new HttpParams()
                      .set('page', pageId  )
                      .set('userEmail', this.userInformation.userEmail.toString() );

                    }else{
                      this.openSnackBar('Please signup to access this feature');
                      this.router.navigateByUrl('/profile');
                      filter = undefined;
                    }

                

              }else if(filter === undefined){
                    filter = undefined;

                    parameters =  new HttpParams()
                    .set('page', pageId )

              }



                // fitered requests
                if(filter != undefined){

                      return this.http.get(`${this.getDealsUrl}/${filter}`, { params: parameters } );

                // unfitered requests
                }else{

                      return this.http.get( `${this.getDealsUrl}`, { params: parameters } );
                      
                }



      }


      // get all coupons by id
      public deleteADeal( couponId, dealerRoleUserEmail ){

        //headers
        let header = new HttpHeaders().set('userEmail', dealerRoleUserEmail.toString() );
        
        //params
        let parameters =  new HttpParams().set('page', couponId.toString() );

        return this.http.delete( this.getCouponsUrl, { params: parameters, headers: header } );
      }


      // bookmark this deal
      public bookmarkADeal(data){

        let parameters =  new HttpParams()
            .set('userEmail', this.userInformation.userEmail.toString() )
            .set('dealId', data.toString() );
        
      const body = {
              'userEmail': this.userInformation.userEmail.toString(),
              'dealId': data.toString()
            }

        let completeUrl = `${this.bookmarkDeals}?userEmail=${this.userInformation.userEmail.toString()}&dealId=${data.toString()}`;
        return this.http.post( completeUrl, body );
      }

    
      public deleteADealBookmark(data){
        let parameters =  new HttpParams()
        .set('userEmail', this.userInformation.userEmail.toString() )
        .set('dealId', data.toString() );


        let completeUrl = `${this.deleteBookmarkedDeal}?userEmail=${this.userInformation.userEmail.toString()}&dealId=${data.toString()}`;
        return this.http.delete(completeUrl);
      }


      public getSavedDeals(){

        // if( this.userInformation ){

          let parameters =  new HttpParams()
          .set('userEmail', this.userInformation === null ? '' : this.userInformation.userEmail )
  
          return this.http.get( this.savedDeals, { params: parameters } );

        // }

      }

      
      // get coupons by user zip code
      public getLocalDealsByZipCode(){

          // if the user has not zip then he/she has to login
          if( this.userInformation.zipCode != null ||this.userInformation.zipCode !== undefined ){
                let parameters =  new HttpParams()
                .set('zipCode', this.userInformation.zipCode.toString() )
          
                return this.http.get( this.dealsByZipCode, { params: parameters } );
          }else{
            this.openSnackBar('Please signup or allow location to access this feature');
            this.router.navigateByUrl('/profile');
          }

      }



  /*-------------------------------------------------------- user api calls --------------------------------------------------------*/



      // get all users
      public getAllUser(data){
        return this.http.get( this.addNewUser, data);
      }


      // add a user
      public addaNewUser(data){
        return this.http.post( this.addNewUser, data);
      }


      // delete user
      public deleteUser(data){

          let parameters =  new HttpParams()
        .set('userEmail', this.adminEmail.toString() )
        .set('id', data.newEmail.toString() );

        
        return this.http.delete( this.addNewUser, data);
      }
    

      // request user code
      public updateUserEmail(data){

        let parameters =  new HttpParams()
        .set('userEmail', data.oldEmail.toString() )
        .set('newEmail', data.newEmail.toString() );

        return this.http.post( `${this.updateUser}?userEmail=${data.oldEmail.toString()}&newEmail=${data.newEmail.toString()}`,  { params: parameters } );
      }


      // request user profile
      public requestUserProfileByEmail(data){

          let parameters =  new HttpParams()
          .set('userEmail', data.toString() );
    
          return this.http.get( `${this.getUser}`, { params: parameters } );
      }


      // request user code
      public requestUserCodeByEmail(data){

        let parameters =  new HttpParams()
        .set('userEmail', data.toString() );

        return this.http.get( `${this.requestUserCode}`, { params: parameters } );
      }


      // verify user code
      public verifyUserCodeByEmail(data:any){

        let parameters =  new HttpParams()
        .set('userEmail', data.email.toString() )
        .set('code', data.code.toString() );

        return this.http.get(`${this.verifyUserCode}`, { params: parameters } );
      }

  
 /*-------------------------------------------------------- events api calls --------------------------------------------------------*/



    // get all coupons by id
    public getAllEvents(pageId:any, filter:string){

      this.allCouponsCollection = [];
      let parameters:any;


      // 4you all local saved 
      if(filter === 'localEvents'){



            // if the user wants the local deals, first we check wether the users has allowed gps, 
            if(this.userLocationCoords.latitude !== '' && this.userLocationCoords.longitude !== ''){

                parameters =  new HttpParams().set('page', pageId)
                .set('latitude', this.userLocationCoords.latitude.toString() )
                .set('longitude', this.userLocationCoords.longitude.toString() );

            }else{

                  //  prompt the user of the need to allow location.
                  this.openDialog();

            
                  if( this.returnLoggedInOrNot() == true ){

                     // if not then we call local by zip
                     this.getLocalEventsByZipCode();

                  }
                  
            }


        
      }else if(filter === 'savedEvents'){

            if( this.returnLoggedInOrNot() == true ){

              parameters =  new HttpParams()
              .set('page', pageId  )
              .set('userEmail', this.userInformation.userEmail.toString() );

            }else{
              this.openSnackBar('Please signup to access this feature')
              this.router.navigateByUrl('/profile');
              filter = undefined;
            }


      }else if(filter === 'matchedEvents'){

            if( this.returnLoggedInOrNot() == true ){

              parameters =  new HttpParams()
              .set('page', pageId  )
              .set('userEmail', this.userInformation.userEmail.toString() );

            }else{
              this.openSnackBar('Please signup to access this feature');

              this.router.navigateByUrl('/profile');

              filter = undefined;
            }

         

      }else if(filter === undefined){
            filter = undefined;

            parameters =  new HttpParams()
            .set('page', pageId )

      }


// fitered requests
if(filter != undefined){

        return this.http.get(`${this.getEventsUrl}/${filter}`, { params: parameters } );

  // unfitered requests
  }else{

        return this.http.get( `${this.getEventsUrl}`, { params: parameters } );
        
  }

}


// get all coupons by id
public deleteAEvent( couponId, dealerRoleUserEmail ){

      //headers
      let header = new HttpHeaders().set('dealerRoleUserEmail', dealerRoleUserEmail.toString() );
      
      //params
      let parameters =  new HttpParams().set('page', couponId.toString() );

      return this.http.delete( this.getEventsUrl, { params: parameters, headers: header } );
}



// bookmark coupon by the user by clicking bookmark icon
public bookmarkAEvent(data){

let parameters =  new HttpParams()
.set('userEmail', this.userInformation.userEmail.toString() )
.set('couponId', data.toString() );

let body =  { 
userEmail: this.userInformation.userEmail.toString(),
couponId: data.toString() 
};


let userEmail = this.userInformation.userEmail.toString();
let couponId = data.toString();

return this.http.post(`${this.bookmarkCoupons}?userEmail=${userEmail}&couponId=${couponId}`, body);
}



// delete coupons saved by the user 
public deleteAEventBookmark(data){

let parameters =  new HttpParams()
.set('userEmail', this.userInformation.userEmail.toString() )
.set('couponId', data.toString() );

let userEmail = this.userInformation.userEmail.toString();
let couponId = data.toString();

return this.http.delete(`${this.deleteAEventBookmark}`,  { params: parameters } );
}



// get coupons saved by the user 
public getSavedEvents(){


      let parameters =  new HttpParams()
      .set('userEmail', this.userInformation.userEmail.toString() )

      return this.http.get(this.savedEvents, { params: parameters } );


}



// get coupons by user zip code
public getLocalEventsByZipCode(){


    if( this.returnLoggedInOrNot() == true ){

            if( this.userInformation.zipCode !== null ||this.userInformation.zipCode !== undefined ){
                  let parameters =  new HttpParams()
                  .set('zipCode', this.userInformation.zipCode.toString() )
            
                  return this.http.get( this.eventsByZipCode, { params: parameters } );
            }

    }else{
      this.openSnackBar('Please signup or allow location to access this feature');

      this.router.navigateByUrl('/profile');
    }


}






}
