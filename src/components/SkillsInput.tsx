/** @format */

import { useState } from "react";
import { Group, Pill, PillGroup, TextInput, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useMantineTheme } from "@mantine/core";
import type { RootState } from "../store/store";
import { addSkill, removeSkill } from "../store/slices/filtersSlice";

export default function SkillsInput() {
  const theme = useMantineTheme(); // ← доступ к теме
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.filters.skills);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      dispatch(addSkill(inputValue.trim()));
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <Group
        align='flex-end'
        mb='xs'>
        <TextInput
          placeholder='Навык'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
        <ActionIcon
          onClick={handleAdd}
          variant='filled'
          style={{ backgroundColor: theme.other?.primary || "#6075e0" }}
          size='input-sm'
          radius='md' // ← делает кнопку круглой
        >
          <IconPlus
            size={16}
            color='white'
          />
        </ActionIcon>
      </Group>
      <PillGroup>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => dispatch(removeSkill(skill))}
            size='md'>
            {skill}
          </Pill>
        ))}
      </PillGroup>
    </div>
  );
}
