import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from "../../utils.service";
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

declare const $: any;

export interface WishlistElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {


    public wishlistDataCollection = {
        "brands": [
        "string"
        ],
        "categories": [
        "string"
        ],
        "id": "0265363464",
        "keywords": ['henry'],
        "userId": "string",
        "vendors": [
        "string"
        ]
    }

    

    public allWishlists = [];
    public prepareAllWishlist = [];

    public myFriendsWishlist  = [];
    public myFriendsWishlistPrepared  = [];

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = this.allWishlists;
    panelOpenState = false;

    
    public keywordValue = '';
    public emailValue  = '';

    public filterButtons = [
        // {  'class': '',  'icon': 'fa-user',  'title': '4 you' },
        {  'class': 'bordered',  'icon': 'fa-home',  'title': 'All' },
        // {  'class': '',  'icon': 'fa-map-marker',  'title': 'Local' },
        // {  'class': '',  'icon': 'fa-bookmark',  'title': 'Saved' }
    ];

    pageId = 1;

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
  

    


    public taggedKeywords =  [];

    constructor(
        private utils: UtilsService,
        private router: Router
    ){}


    ngOnInit() {
    }


    ngAfterViewInit(){

        setTimeout( ()=>{
            this.getAllWishlists(this.pageId);
        }, 1000);

    }

    
    
    
    getWishlisByTimeout(){
        setTimeout( ()=>{
            this.getAllWishlists(this.pageId);
        }, 1000);
    }



    trackElement(index: number) {
        return index;
    }



    pushToCollection(where, data){

        console.log( 'myFriendsWishlistPrepared', data );

        if( where === this.myFriendsWishlist ){

            data.map( oneData => {

                let data = oneData;
                where.push( data );
                this.myFriendsWishlistPrepared.push( data.keywords[0] );

            }); 

            // sorting algorithm to sort the array by the keywords property
            where.sort( ( a, b ) => {
                    if ( a.keywords[0] < b.keywords[0] ){ return -1; }
                    return 0;   
                });

            this.myFriendsWishlistPrepared.sort( ( a, b ) => {
                    if ( a < b ){ return -1; }
                    return 0;   
                });


        }else{

                data.map( oneData => {
                    where.push( oneData );
                    this.prepareAllWishlist.push( oneData.keywords[0] );
                });  

                // sorting algorithm to sort the array by the keywords property
                where.sort( ( a, b ) => {
                if ( a.keywords[0] < b.keywords[0] ){ return -1; }
                return 0;   
                });

                this.prepareAllWishlist.sort( ( a, b ) => {
                    if ( a < b ){ return -1; }
                    return 0;   
                });

        }

    }

    callGetWishlistWhenInput(e){

        if( e.keyCode == 13 || e.button === 0 ){

            this.getWIshlistByInputEmail();

        }

    }
   

    getWIshlistByInputEmail(){

        const userEmail = this.emailValue;

        console.log(userEmail);

        if( this.utils.validateEmail(userEmail) ){

            if( this.utils.returnLoggedInOrNot() == true ){

                this.utils.getAllMyWishlistByEmail(userEmail).subscribe(

                        res =>{

                            this.myFriendsWishlist = [];
                            this.myFriendsWishlistPrepared = [];
                            this.pushToCollection( this.myFriendsWishlist, res );

                        },
                        err =>{
                            this.utils.openSnackBar('Failed to get user wishlists, please check your internet connection.');
                        }
                    
                );
    
            }else{
                this.utils.openSnackBar('Please signup to access this feature');
                this.router.navigateByUrl('/profile');
            }

        }else{
            let message = 'Your email is not valid, please try again.';
            this.utils.openSnackBar(message);
        }

    }

    getAllWishlists(pageId){

        this.allWishlists = [];
        this.prepareAllWishlist = [];
        
        if( this.utils.returnLoggedInOrNot() == true ){

                this.utils.getAllMyWishlist(pageId).subscribe(

                        res =>{
                            this.pushToCollection( this.allWishlists, res );
                        },
                        err =>{
                            this.utils.openSnackBar('Failed to get your wishlists, please check your internet connection.');
                        }
                    
                );
      
        }else{
            this.utils.openSnackBar('Please signup to access this feature');
            this.router.navigateByUrl('/profile');
        }


    };


    uploadThisKeyword(res){
        this.getWishlisByTimeout();
    }

    addThisKeyword(){

        if(this.keywordValue !== ''){

            let trimmedkeyword = this.keywordValue;
            let isKeywordPartOfList = this.prepareAllWishlist.some( oneData => oneData.trim() === trimmedkeyword.trim() );


            if(!isKeywordPartOfList){

                this.wishlistData.keywords = [];
                this.wishlistData.keywords.push(trimmedkeyword);
                this.sendNewKeyword();
                
            }else{
                this.utils.openSnackBar('Sorry keyword is already part of the wishlist.');
            }
        
        }else{
            this.utils.openSnackBar('Keyword value cant be empty');
        }

    }

    sendNewKeyword(){

        this.utils.addANewWishList(this.wishlistData).subscribe(
            res =>{
                    this.uploadThisKeyword(res);
                    this.keywordValue = '';
            },
            err =>{
                this.utils.openSnackBar('Failed to add new keyword, please try again');
            }
        );

    }

    removeThisKeyword(feed){

            if(feed){

                this.utils.deleteAWishList(feed.id).subscribe(
                    res =>{
                            this.getWishlisByTimeout();
                    },
                    err =>{
                            this.getWishlisByTimeout();
                    }
                );

            }

    }

    

}
