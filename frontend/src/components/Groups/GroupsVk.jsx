import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  pageCurrentValue,
  pageCountValue,
} from "../../store/slice/paginatorSlice";
import { useLocation, useNavigate } from "react-router-dom";
import GroupCardVk from "../GroupCard/GroupCardVk";
import {
  addToCart,
  addToFavorites,
  getGroupsVk,
  getGroupsVkShoppingCart,
  removeFromCart,
  removeFromFavorites,
} from "../../api/api";
import Paginator from "../Paginator";
import { badgeValue } from "../../store/slice/badgeSlice";

const GroupsVk = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  const categoryValue = useSelector((state) => state.filter.category);
  const isLabel = useSelector((state) => state.filter.label);
  const searchValue = useSelector((state) => state.filter.search);
  const sortValue = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.paginator.pageCount);
  const pageCurrent = useSelector((state) => state.paginator.pageCurrent);
  const priceMin = useSelector((state) => state.filter.priceMin);
  const priceMax = useSelector((state) => state.filter.priceMax);

  useEffect(() => {
    getGroupsVk({
      pageCurrent,
      categoryValue,
      searchValue,
      sortValue,
      isLabel,
      priceMin,
      priceMax,
    })
      .then((res) => {
        setGroups(res.results);
        dispatch(pageCountValue(Math.ceil(res.count / 50)));
        dispatch(
          pageCurrentValue(parseInt(location.search?.split("=")[1] || 1)),
        );
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        dispatch(pageCurrentValue(1));
        (() => navigate(`/vk?page=1`))();
      });
  }, [
    categoryValue,
    searchValue,
    pageCurrent,
    sortValue,
    dispatch,
    location.search,
    navigate,
    isLabel,
    priceMin,
    priceMax,
  ]);

  useEffect(() => {
    getGroupsVkShoppingCart({
      isShoppingCart: "True",
    })
      .then((res) => {
        dispatch(badgeValue(res.count));
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, [dispatch, groups]);

  const handleLike = ({ id }) => {
    addToFavorites({ id })
      .then((res) => {
        const groupsUpdated = groups.map((group) => {
          if (group.id === id) {
            group.is_favorited = true;
          }
          return group;
        });
        setGroups(groupsUpdated);
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  const handleDeleteLike = ({ id }) => {
    removeFromFavorites({ id })
      .then((res) => {
        const groupsUpdated = groups.map((group) => {
          if (group.id === id) {
            group.is_favorited = false;
          }
          return group;
        });
        setGroups(groupsUpdated);
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  const handleCart = ({ id }) => {
    addToCart({ id })
      .then((res) => {
        const groupsUpdated = groups.map((group) => {
          if (group.id === id) {
            group.is_in_shopping_cart = true;
          }
          return group;
        });
        setGroups(groupsUpdated);
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };
  const handleDeleteCart = ({ id }) => {
    removeFromCart({ id })
      .then((res) => {
        const groupsUpdated = groups.map((group) => {
          if (group.id === id) {
            group.is_in_shopping_cart = false;
          }
          return group;
        });
        setGroups(groupsUpdated);
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          alert(errors);
        }
      });
  };

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        spacing={2}
        flexDirection='column'>
        <Paginator
          page={pageCurrent}
          count={pageCount}
          link={"vk"}
        />
        {groups.map((group) => (
          <GroupCardVk
            key={group.id}
            group={group}
            handleLike={handleLike}
            handleDeleteLike={handleDeleteLike}
            handleCart={handleCart}
            handleDeleteCart={handleDeleteCart}></GroupCardVk>
        ))}
        <Paginator
          page={pageCurrent}
          count={pageCount}
          link={"vk"}
        />
      </Grid>
    </Container>
  );
};

export default GroupsVk;
