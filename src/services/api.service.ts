import { Injectable } from "@angular/core";
import { delay, from, Observable, of, throwError } from "rxjs";
import { ApiResponse, IUser, USERS, UsersApiResponse } from "src/datasource";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private users = USERS;
    private queue = USERS;

    getQueue() {
        return this.queue;
    }

    /*Pops next users from the queue */
    getNextFromQueue(): Observable<ApiResponse<IUser>> {
        const nextInQueue = this.queue[0];
        const responses: ApiResponse<IUser> = {status: "success", data: nextInQueue};

        // if (Math.random() > 0.8) // sometimes we make the request fail on purpose
        //     return throwError(() => new Error("Error while fetching users data. Please retry..."))

        console.log("getting next user from queue: ", nextInQueue);
        this.queue = this.queue.filter(u => u.id != nextInQueue.id)
        return of(responses).pipe(delay(1500)); // pretend it takes some time to get the next person from the queue
    }

    /*Pretending to convert user balance in native casino currency */
    convertUserBalance(userId: number): Observable<ApiResponse<number>> {
        const succ: ApiResponse<number> = {status: "success", data: this.users.filter(u => u.id == userId)[0].balance }
        return of(succ).pipe(delay(1500)); // pretend it takes some time to convert the user balance
    }

    
}

