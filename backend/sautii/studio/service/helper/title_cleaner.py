
def generate_title(prompt):

    clean_prompt = prompt.strip()
    words = clean_prompt.split()

    if len(words) > 6:
        title = " ".join(words[:6])
    else:
        title = clean_prompt

    return title.capitalize()