import json
import numpy as np
import csv
import urllib
import matplotlib.pyplot as plt
import numpy as np
import pylab

def main():
    url = "https://quickmaths-baf21.firebaseio.com/.json?auth=b0gfYHOMZCMzHEw2MtRs98eWCOWKwa6f5zG6hSyy"
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    #data = json.load(open('data.json'))
    users = data["users"]

    total_games_played = 0
    endurance_counter = 0
    classic_counter = 0
    younglings = []
    midlings = []
    elderlings = []
    all_players = []
    endurance_game_times = np.zeros((100,), dtype=np.int)
    classic_game_times = np.zeros((100,), dtype=np.int)
    younglings_games_played = 0
    midlings_games_played = 0
    elderlings_games_played = 0
    solo_game_players = 0
    males  = 0
    male_games_played = 0
    females = 0
    female_games_played = 0
    classic_games_won = 0
    endurance_games_won = 0
    most_games_played = 0
    endurance_players = 0
    classic_players = 0
    highest_endurance_level_male = 0
    highest_endurance_level_female = 0

    highest_classic_level_male = 0
    highest_classic_level_female = 0

    endurance_fails = 0
    classic_fails = 0
    player_count = 0

    user_max_level_classic = 0
    user_max_level_endurance = 0

    user_gamemode_highest_level = csv.writer(open('highestLevels.csv', 'w'), delimiter=',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
    user_gamemode_highest_level.writerow(['userID', 'gamemode', 'level'])

    for user_str in users:

        user_max_level_classic = 0
        user_max_level_endurance = 0

        all_players.append(user_str)
        player_count += 1
        total_games_played += users[user_str]["nb_games_played"]

        # check for solo-game players
        if users[user_str]["nb_games_played"] == 1:
            solo_game_players += 1

        if users[user_str]["nb_games_played"] > most_games_played:
            most_games_played = users[user_str]["nb_games_played"]


        #check for age
        if users[user_str]["info"]["age"] < 18 :
            younglings.append(user_str)
        elif users[user_str]["info"]["age"] < 21:
            midlings.append(user_str)
        else:
            elderlings.append(user_str)

        #check for gender

        if users[user_str]["info"]["gender"] == "male":
            males += 1
        else:
            females += 1

        endurance_games_played_by_user = 0
        classic_games_played_by_user = 0
        endurance_fails_by_user = 0
        classic_fails_by_user = 0

        # GET GAME TIME PER MODE
        for game_tag in users[user_str]["games"]:
            if users[user_str]["info"]["age"] < 18:
                younglings_games_played += 1
            elif users[user_str]["info"]["age"] < 21:
                midlings_games_played += 1
            else:
                elderlings_games_played += 1

            if users[user_str]["info"]["gender"] == "male":
                male_games_played += 1
            else:
                female_games_played += 1

            game_type = users[user_str]["games"][game_tag]["type"]
            if game_type == "Endurance":
                endurance_counter += 1
                endurance_games_played_by_user += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    if abs(total_time) < 1000:
                        endurance_game_times[player_count] += total_time

                if users[user_str]["games"][game_tag]["result"] == "Won":
                    endurance_games_won += 1
                if users[user_str]["games"][game_tag]["result"] == "GameOver":
                    endurance_fails_by_user += 1

                if (users[user_str]["info"]["gender"] == "male" and
                                users[user_str]["games"][game_tag]["level"] > highest_endurance_level_male):
                    highest_endurance_level_male = users[user_str]["games"][game_tag]["level"]

                if (users[user_str]["info"]["gender"] == "female" and
                            users[user_str]["games"][game_tag]["level"] > highest_endurance_level_female):
                    highest_endurance_level_female = users[user_str]["games"][game_tag]["level"]
                if users[user_str]["games"][game_tag]["level"] > user_max_level_endurance:
                    user_max_level_endurance = users[user_str]["games"][game_tag]["level"]

            else:
                classic_counter += 1
                classic_games_played_by_user += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    if abs(total_time) < 1000:
                        classic_game_times[player_count] += total_time

                if users[user_str]["games"][game_tag]["result"] == "Won":
                    classic_games_won += 1
                if users[user_str]["games"][game_tag]["result"] == "GameOver":
                    classic_fails_by_user += 1

                if (users[user_str]["info"]["gender"] == "male" and
                            users[user_str]["games"][game_tag]["level"] > highest_classic_level_male):
                    highest_classic_level_male = users[user_str]["games"][game_tag]["level"]

                if (users[user_str]["info"]["gender"] == "female" and
                            users[user_str]["games"][game_tag]["level"] > highest_classic_level_female):
                    highest_classic_level_female = users[user_str]["games"][game_tag]["level"]
                if users[user_str]["games"][game_tag]["level"] > user_max_level_classic:
                    user_max_level_classic = users[user_str]["games"][game_tag]["level"]

        if endurance_games_played_by_user > 0:
            endurance_verhouding_user = float(endurance_fails_by_user) / float(endurance_games_played_by_user)
            endurance_fails += endurance_verhouding_user
        if classic_games_played_by_user > 0:
            classic_verhouding_user = float(classic_fails_by_user) / float(classic_games_played_by_user)
            classic_fails += classic_verhouding_user

        if endurance_games_played_by_user > 0:
            endurance_players += 1
        if classic_games_played_by_user > 0:
            classic_players += 1

        if user_max_level_endurance > 0:
            user_gamemode_highest_level.writerow([user_str, 'Endurance', user_max_level_endurance])

        if user_max_level_classic > 0:
            user_gamemode_highest_level.writerow([user_str, 'Classic', user_max_level_classic])

        # print(user_str + " speelde " + str(endurance_games_played_by_user + classic_games_played_by_user) + " game(s), " + str(endurance_games_played_by_user) + " endurance, " + str(classic_games_played_by_user) + "classic")

    # writer = csv.writer(open('gemiddeldes.csv', 'w'), delimiter=',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
    # writer.writerow("C")
    # writer.writerow(classic_game_times)
    # writer.writerow("E")
    # writer.writerow(endurance_game_times)
    #print("gemiddeldes.csv generated")

    arr1 = np.concatenate(([], classic_game_times[classic_game_times != 0]))
    arr2 = np.concatenate(([], endurance_game_times[endurance_game_times != 0]))

    fig = plt.figure(1, figsize=(10, 6))
    ax = fig.add_subplot(111)
    ax.set_title('Totale tijd per speler', fontsize=14, fontweight='bold')
    ax.set_ylabel('Seconden')
    axes = plt.gca()
    axes.set_ylim([0,np.amax(np.concatenate((arr1, arr2)))+10])
    bp = ax.boxplot(([arr1, arr2]),labels=("Classic", "Endurance"), widths=(0.5, 0.5))
    pylab.savefig('boxplot.pdf', bbox_inches='tight')
    youngling_verhouding = float(younglings_games_played) / float(total_games_played)
    midling_verhouding = float(midlings_games_played) / float(total_games_played)
    elderling_verhouding = float(elderlings_games_played )/ float(total_games_played)

    total_players = (len(younglings)+len(midlings)+len(elderlings))

    print("Verhouding spelers 13-17 jaar: " + str((float(len(younglings))/float(total_players))*100)+" %")
    print("Verhouding spelers 18-20 jaar: " + str((float(len(midlings))/float(total_players))*100)+" %")
    print("Verhouding spelers 21+ jaar: " + str((float(len(elderlings))/float(total_players))*100)+" %")

    print("Verhouding spelers 13-17 jaar gespeeld: " + str(youngling_verhouding*100)+" %")
    print("Verhouding spelers 18-20 jaar gespeeld: " + str(midling_verhouding*100)+" %")
    print("Verhouding spelers 21+ jaar gespeeld: " + str(elderling_verhouding*100)+" %")

    print("Endurance levels: " + str(endurance_counter) + " gespeeld en " + str(endurance_games_won) + " werden gewonnen. (" + str((float(endurance_games_won)/float(endurance_counter))*100) + " %)")
    print(str(endurance_players) + " mensen hebben Endurance gespeeld, dus gemiddeld " + str(float(endurance_counter)/float(endurance_players)) + " levels gespeeld.")
    print("Hoogst behaalde Endurance level: " + str(highest_endurance_level_male) + " (male)")
    print("Hoogst behaalde Endurance level: " + str(highest_endurance_level_female) + " (female)")

    print("Classic levels: " + str(classic_counter) + " gespeeld en " + str(classic_games_won) + " werden gewonnen. (" + str((float(classic_games_won)/float(classic_counter))*100) + " %)")
    print(str(classic_players) + " mensen hebben Classic gespeeld, dus gemiddeld " + str(float(classic_counter)/float(classic_players)) + " levels gespeeld.")

    print("Hoogste behaalde Classic level: " + str(highest_classic_level_male) + " (male)")
    print("Hoogste behaalde Classic level: " + str(highest_classic_level_female) + " (female)")


    print(str(solo_game_players) + " mensen hebben slechts 1 level gespeeld.")
    print("Het meeste spelletjes dat iemand speelde is: " + str(most_games_played) + ".")

    print(str(males+females) + " spelers hebben " + str(total_games_played) + " levels gespeeld, dus " + str((float(total_games_played))/(float(males+females))) + " per persoon")
    print(str(males) + " mannen hebben " + str(male_games_played) + " levels gespeeld, dus " + str(float(male_games_played)/float(males)) + " per persoon.")
    print(str(females) + " vrouwen hebben " + str(female_games_played) + " levels gespeeld, dus " + str(float(female_games_played)/float(females)) + " per persoon.")

    print("Gemiddeld aantal verloren Endurance levels tov aantal levels dat een gebruiker speelde:" + str(((float(endurance_fails))/float(endurance_players))*100) + " %")
    print("Gemiddeld aantal verloren Classic levels tov aantal levels dat een gebruiker speelde:" + str(((float(classic_fails))/float(classic_players))*100) + " %")

    print("Endurance fails: " + str(float(endurance_fails)))
    print("Classic fails: " + str(float(classic_fails)))

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

if __name__ == "__main__":
    main()
