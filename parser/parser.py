import json
import numpy as np
import csv
import urllib

def main():
    url = "https://quickmaths-baf21.firebaseio.com/.json?auth=b0gfYHOMZCMzHEw2MtRs98eWCOWKwa6f5zG6hSyy"
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    print data
    #data = json.load(open('data.json'))
    users = data["users"]

    total_games_played = 0
    endurance_counter = 0
    classic_counter = 0
    younglings = []
    elderlings = []
    all_players = []
    endurance_game_times = []
    classic_game_times = []
    younglings_games_played = 0
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


    for user_str in users:

        all_players.append(user_str)

        total_games_played += users[user_str]["nb_games_played"]

        # check for solo-game players
        if users[user_str]["nb_games_played"] == 1:
            solo_game_players += 1

        if users[user_str]["nb_games_played"] > most_games_played:
            most_games_played = users[user_str]["nb_games_played"]


        #check for age
        if users[user_str]["info"]["age"] < 18 :
            younglings.append(user_str)
        else:
            elderlings.append(user_str)

        #check for gender

        if users[user_str]["info"]["gender"] == "male":
            males += 1
        else:
            females += 1

        endurance_games_played_by_user = 0
        classic_games_played_by_user = 0
        # GET GAME TIME PER MODE
        for game_tag in users[user_str]["games"]:
            if users[user_str]["info"]["age"] < 18:
                younglings_games_played += 1
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
                        endurance_game_times.append(total_time)

                if users[user_str]["games"][game_tag]["result"] == "Won":
                    endurance_games_won += 1

                if (users[user_str]["info"]["gender"] == "male" and
                                users[user_str]["games"][game_tag]["level"] > highest_endurance_level_male):
                    highest_endurance_level_male = users[user_str]["games"][game_tag]["level"]

                if (users[user_str]["info"]["gender"] == "female" and
                            users[user_str]["games"][game_tag]["level"] > highest_endurance_level_female):
                    highest_endurance_level_female = users[user_str]["games"][game_tag]["level"]

            else:
                classic_counter += 1
                classic_games_played_by_user += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    if abs(total_time) < 1000:
                        classic_game_times.append(total_time)

                if users[user_str]["games"][game_tag]["result"] == "Won":
                    classic_games_won += 1
                if (users[user_str]["info"]["gender"] == "male" and
                            users[user_str]["games"][game_tag]["level"] > highest_classic_level_male):
                    highest_classic_level_male = users[user_str]["games"][game_tag]["level"]

                if (users[user_str]["info"]["gender"] == "female" and
                            users[user_str]["games"][game_tag]["level"] > highest_classic_level_female):
                    highest_classic_level_female = users[user_str]["games"][game_tag]["level"]

        if endurance_games_played_by_user > 0:
            endurance_players += 1
        if classic_games_played_by_user > 0:
            classic_players += 1

        # print(user_str + " speelde " + str(endurance_games_played_by_user + classic_games_played_by_user) + " game(s), " + str(endurance_games_played_by_user) + " endurance, " + str(classic_games_played_by_user) + "classic")

    writer = csv.writer(open('gemiddeldes.csv', 'w'), delimiter=',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
    writer.writerow("C")
    writer.writerow(classic_game_times)
    writer.writerow("E")
    writer.writerow(endurance_game_times)
    print("gemiddeldes.csv generated")

    youngling_verhouding = younglings_games_played / total_games_played
    elderling_verhouding = elderlings_games_played / total_games_played

    print("Verhouding spelers <18jaar: " + str(youngling_verhouding))
    print("Verhouding spelers >18jaar: " + str(elderling_verhouding))

    print("Endurance games: " + str(endurance_counter) + " gespeeld en " + str(endurance_games_won) + " werden gewonnen. (" + str(endurance_games_won/endurance_counter) + "%)")
    print(str(endurance_players) + " mensen hebben Endurance gespeeld, dus gemiddeld " + str(endurance_counter/endurance_players) + " games gespeeld.")
    print("Hoogst behaalde Endurance level: " + str(highest_endurance_level_male) + " (male)")
    print("Hoogst behaalde Endurance level: " + str(highest_endurance_level_female) + " (female)")

    print("Classic games: " + str(classic_counter) + " gespeeld en " + str(classic_games_won) + " werden gewonnen. (" + str(classic_games_won/classic_counter) + "%)")
    print(str(classic_players) + " mensen hebben Classic gespeeld, dus gemiddeld " + str(classic_counter/classic_players) + " games gespeeld.")

    print("Hoogste behaalde Classic level: " + str(highest_classic_level_male) + " (male)")
    print("Hoogste behaalde Classic level: " + str(highest_classic_level_female) + " (female)")


    print(str(solo_game_players) + " mensen hebben slechts 1x een spelletje gespeeld.")
    print("Het meeste spelletjes dat iemand speelde is: " + str(most_games_played) + ".")

    print(str(males+females) + " spelers hebben " + str(total_games_played) + " games gespeeld, dus " + str( (total_games_played)/(males+females)) + " per persoon")
    print(str(males) + " mannen hebben " + str(male_games_played) + " games gespeeld, dus " + str(male_games_played/males) + " per persoon.")
    print(str(females) + " vrouwen hebben " + str(female_games_played) + " games gespeeld, dus " + str(female_games_played/females) + " per persoon.")

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

if __name__ == "__main__":
    main()
