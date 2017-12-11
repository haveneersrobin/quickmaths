import json
import numpy as np
import csv


def main():
    data = json.load(open('data.json'))
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

    for user_str in users:

        all_players.append(user_str)

        total_games_played += users[user_str]["nb_games_played"]

        # check for solo-game players
        if users[user_str]["nb_games_played"] == 1:
            solo_game_players += 1

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
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    if abs(total_time) < 1000:
                        endurance_game_times.append(total_time)
            else:
                classic_counter += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    if abs(total_time) < 1000:
                        classic_game_times.append(total_time)

    writer = csv.writer(open('gemiddeldes.csv', 'w'), delimiter=',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
    writer.writerow("C")
    writer.writerow(classic_game_times)
    writer.writerow("E")
    writer.writerow(endurance_game_times)
    print("gemiddeldes.csv generated")

    youngling_verhouding = younglings_games_played / total_games_played
    elderling_verhouding = elderlings_games_played / total_games_played

    print("Verhouding <18 / alle games: " + str(youngling_verhouding))
    print("Verhouding >18 / alle games: " + str(elderling_verhouding))
    print(str(solo_game_players) + " mensen hebben slechts 1x een spelletje gespeeld.")

    print(str(males) + " mannen hebben " + str(male_games_played) + " spellen gespeeld, dus ~" + str(male_games_played/males) + " per persoon.")
    print(str(females) + " vrouwen hebben " + str(female_games_played) + " spellen gespeeld, dus ~" + str(female_games_played/females) + " per persoon.")

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

if __name__ == "__main__":
    main()
