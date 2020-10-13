import {Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { smoothlyMenu } from "../../app.helpers";
import { UtilsService } from "../../utils.service";
import { Router, ActivatedRoute } from "@angular/router";

declare const $: any;

import {Login} from "../../models/login";

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.component.html'
})

export class Topnavbar {

    
    public isUserLoggedIn = false;
    public showEmailVerification = false;
    public showCodeVerification = false;
    public showSessionChoices = true;
    keywordValue = '';
    public btnTextContent = { 'title':'Save', 'icon': 'fa-upload-o' };

    public searchKeyword = '';
    public wishlistData = {
        "brands": [
          "string"
        ],
        "categories": [
          "string"
        ],
        "id": "string",
        "keywords": [],
        "userId": "string",
        "vendors": [
          "string"
        ]
  }

    public sessionButtons = [
        { 'class': 'success', 'icon': 'fa-sign-in', 'title': 'Login' },
        { 'class': 'primary', 'icon': 'fa-user', 'title': 'Register' },
    ];

    public slideshowImagesArray = [
        '../../../assets/img/slideshow/coupons.jpg',
        '../../../assets/img/slideshow/steal.jpg',
        '../../../assets/img/slideshow/saving_2.jpg',
    ];


    public userProfileInfo:any = {
            'firstName': '',
            'userEmail': '',
            'emailEnabled': '',
            'infoProvider': '',
            'pnsEnabled': '',
            'gender': '',
            'role': 'user',
            'zipCode': ''
    }

    public tmpSearchMatch = {
        'base64ImageBytes': "../../../assets/logo.png",
        'brand': "henry",
        'categories': null,
        'city': "henry",
        'description': "Maybe I will just devote my life to coding, nothing else makes me want it more.",
        'expDate': "11/20/2018",
        'id': "oTw_IGcBHQXGh17wY7QT",
        'keywords': null,
        'timeStamp': '2018-11-17T05:58:02.252Z',
        'title': "10px solid ",
        'url': "henry",
        'vendor': "henry",
        'zipCode': ""
    };

    public searchResults = [ ];
    public showFilterable = this.utils.showFilterable;
    public showTopNavbar = true;
    public allDeals = [];

    public advertisementImage = '../../assets/img/saving.jpg';

    constructor(
        public utils: UtilsService,
        private router: Router, 
        private route:ActivatedRoute
      ){}


    ngOnInit() {
        this.utils.getTheUserLocation();
    }
    
    setTheInputValue(){
        let currentURL = window.location.pathname;

        if( currentURL === '/profile'){
            this.showTopNavbar = false;
        }
        
    }


    @Input() loginInfo:Login;


    public sideMenuRoutes = [
        // {'route': 'wishlist',    'icon': 'fa-heart', 'title': 'Wishlist' },
        {'route': 'deals',   'icon': 'fa-usd',  'title': 'Deals' },
        {'route': 'coupons', 'icon': 'fa-ticket', 'title': 'Coupons' },
        // {'route': 'deals',   'icon': 'fa-usd',  'title': 'Deals & Coupons' },
        {'route': 'myoffers',  'icon': 'fa-calendar', 'title': 'My offers' },
        {'route': 'events',  'icon': 'fa-calendar', 'title': 'Events' },
        {'route': 'local',  'icon': 'fa-map-marker', 'title': 'Local' },
        {'route': 'saved',  'icon': 'fa-user', 'title': 'Saved' },
    ];


    showResultsWhenSearchIsHovered(){

        // console.log('Apply to the div.');

        // get the search input and add an event listener
        // on hover listener, show the input
        document.getElementById('navbar_search_input').addEventListener("click", function(){
            // console.log('Applying styles to the div.');
            document.getElementById('openerResults').style.visibility = 'visible';
            document.getElementById('openerResults').style.opacity = '1';
        });

        document.getElementById('navbar_search_input').addEventListener("blur", function(){
            // console.log('Applying styles to the div.');
            document.getElementById('openerResults').style.visibility = 'hidden';
            document.getElementById('openerResults').style.opacity = '0';
        });



    }


    activeRoute(routename: string): boolean{
        routename = routename.split(" ").join("");
        return this.router.url.indexOf(routename) > -1;
    }



    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }


    logout() {
        localStorage.clear();
        // location.href='http://to_login_page';
    }




    pushToCollection(where, data){
  

        data.map( oneData =>{
                  let ourData = JSON.parse( oneData );
    
                   // console.log( this.convertUTCDateToLocalDate( oneData.entryTime ) );
                   let newDate = new Date( ourData.entryTime ).toLocaleString();
    
                   ourData.formattedDate = `${ new Date( newDate ).getDay() } / ${ new Date( newDate ).getMonth() } / ${ new Date( newDate ).getFullYear()}`;
    
                   where.push(  ourData );
        });
    
      }


    
    setThisProfile(){

        this.utils.addaNewUser( this.userProfileInfo).subscribe(
            res =>{

                // turning some content into strings so i can see them
                res["pnsEnabled"] = res["pnsEnabled"].toString();
                res["emailEnabled"] = res["emailEnabled"].toString();

                this.utils.deleteLocally('user');

                this.userProfileInfo =  res ;

                this.utils.storeLocally('user', res);

                this.utils.openSnackBar('Registration Success, please check internet connecton');

            },
            err =>{
                this.utils.openSnackBar('Sorry registration failed, please check internet connecton');
            }
        );


    }


    choosePage( option ){
        let optionTitle = option;

        this.utils.showFilterable = false;
        
        this.showSessionChoices = false;

        if(optionTitle == 'Login'){
            this.showEmailVerification = true;
        }else{
            this.isUserLoggedIn = true;
        }

    }

    searchThisKeyword(e){

        let keyword = this.searchKeyword.toLowerCase(); // turn the search keyword to lowercase
        this.searchResults = []; // empty the current results

        if( e.keyCode == 13 || e.button === 0 ){

            this.router.navigateByUrl('/', {skipLocationChange: true}).then( () => { 
                this.router.navigate(['/search',  { searchKeyword: keyword }] );
                
                this.getResultsBasedOnData(keyword);

            });

        }

        // this.getResultsBasedOnData(keyword);

      
    }


    searchThisKeywordBtn(){

        let keyword = this.searchKeyword;
        this.searchResults = []; // empty the current results
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate( ['/search',  { searchKeyword: keyword }  ] ));
      
    }


    logTheUserOut(){
        localStorage.removeItem('user');
        this.router.navigateByUrl('/');
    }


    getResultsBasedOnData(searchKey){

        this.searchResults = []; // empty the current results

        this.findInThresults(searchKey);
    }
  

    findInThresults(searchKey){
  
           this.utils.findMeThisKeyword(1, searchKey).subscribe(
              res =>{
                this.pushToCollection( this.searchResults, res );
              },
              err =>{
                this.utils.openSnackBar('Sorry we had an error while finding your search results');
              }
            );
      
    }
    addThisKeyword(){
        if(this.keywordValue !== ''){
            let trimmedkeyword = this.keywordValue;
                this.wishlistData.keywords = [];
                this.wishlistData.keywords.push(trimmedkeyword);
                this.utils.addANewWishList(this.wishlistData).subscribe(
                    res =>{
                        this.keywordValue = '';
                        this.utils.openSnackBar('Keyword added successfully.');
                    },
                    err =>{
                        this.utils.openSnackBar('Failed to add new keyword, please try again');
                    }
                );
        }else{
            this.utils.openSnackBar('Keyword value cant be empty');
        }

    }

    checkLogin(){
        if( this.utils.returnLoggedInOrNot() !== true ){
            this.utils.openSnackBar('Please signup or allow location to access this feature');
            this.router.navigateByUrl('/profile');
        }            
        
    }
}